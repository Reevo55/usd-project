import requests
from bs4 import BeautifulSoup
import sys
from copy import copy

login_url = 'https://edukacja.pwr.wroc.pl/EdukacjaWeb/logInUser.do'
base_url = 'https://edukacja.pwr.wroc.pl'


def save_to_html(response, filename='test.html'):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(response.text)


def get_session_param(href):
    index = href.find("clEduWebSESSIONTOKEN")
    session_param = href[index + 1:]
    index = session_param.find("=")
    session_param = session_param[index + 1:]
    index = session_param.find("&")

    if index != -1:
        session_param = session_param[:index]

    return session_param


def get_payload(response):
    if len(sys.argv) < 3:
        username = input("username: ")
        password = input("password: ")
    else:
        username = sys.argv[1]
        password = sys.argv[2]

    payload = {
        'login': username,
        'password': password,
        'action': '/EdukacjaWeb/logInUser.do',
    }

    soup = BeautifulSoup(response.content, 'html.parser')
    csrf = soup.find('input', {"name": "cl.edu.web.TOKEN"})
    session_ = soup.find('input', {"name": "clEduWebSESSIONTOKEN"})

    if csrf is not None:
        payload['cl.edu.web.TOKEN'] = csrf['value']
    if session_ is not None:
        payload['clEduWebSESSIONTOKEN'] = session_['value']

    # print(f'payload: {payload}')
    return payload


def find_enrollments(session, href):
    response = session.get(base_url + href)
    soup = BeautifulSoup(response.content, 'lxml')

    enrollments_table = soup.find('a', {"name": "hrefZapisyTabela"}).findNext('table').findNext('table')
    rowID_inputs = enrollments_table.find_all('input', {"name": "rowId"})

    for rowID_input in rowID_inputs:
        positionIterator_input = rowID_input.findNext('input')
        event_input = positionIterator_input.findNext('input')

        payload = {
            "rowId": rowID_input['value'],
            "positionIterator": positionIterator_input['value'],
            "event_ZapisyPrzegladanieGrup": event_input['value'],
            'clEduWebSESSIONTOKEN': get_session_param(href)
        }

        if payload['event_ZapisyPrzegladanieGrup'] == 'Przeglądanie grup':
            print(payload)
            find_courses(session, payload, href)


def find_courses(session, payload, href):
    # zanim wyślemy POST, trzeba dodać filtry z formularza
    form = {
        "KryteriumFiltrowania": "Z_WEKTORA_ZAP",
        "filtrKodGrupy": "",
        "filtrKodKursu": "",
        "filtrNazwaKursu": "",
        "filtrInePrNazwisko": "",
        "ineJorSymbol": "",
        "ineJorId": "",
        "ineJorSymbol_cl_edu_web_lov_handlerClass": "cl.edu.web.common.lov.handlers.JednostkiOrganizacyjneLovHandler",
        "ineJorSymbol_cl_edu_web_lov_callback": "/zapisy.do?event=forwardZapisy",
        "ineJorSymbol_cl_edu_web_lov_callback_href": "hrefKryteriumFiltrowania",
        "filtrGrupyWDniu": "",
        "filtrGodzOd": "",
        "filtrGodzDo": "",
        "filtrCzyRez": "",
        "filtrCzyPowt": "",
        "filtrCzyZabl": "",
    }
    payload.update(form)

    # dodanie parametrów GET
    relative_url = href
    index = relative_url.find("?")

    if index != -1:
        relative_url = relative_url[:index]

    # https://edukacja.pwr.wroc.pl/EdukacjaWeb/zapisy.do?event=ZapiszFiltr&event=wyborKryterium&href=#hrefKryteriumFiltrowania
    GET_params = [
        ["event", "ZapiszFiltr"],
        ["event", "wyborKryterium"],
        ["href", "#hrefKryteriumFiltrowania"]
    ]

    params_string = '&'.join([param[0] + '=' + param[1] for param in GET_params])
    url = base_url + relative_url + "?" + params_string

    response = session.post(url, data=payload)
    save_to_html(response)
    soup = BeautifulSoup(response.content, 'html.parser')

    # przejscie po kazdym kursie z wektora zapisowego
    courses_table = soup.find('a', {"name": "hrefKursyWGrupieTabela"})

    if courses_table is None:
        print("Brak kursów")
        return

    courses_table = courses_table.findNext('table')
    pages = courses_table.find_all('input', {"class": "paging-numeric-btn"})
    for page in pages:
        print(page)

    for i in range(len(pages) + 1):
        page_payload = {
            "clEduWebSESSIONTOKEN": payload['clEduWebSESSIONTOKEN'],
            "pagingIterName": "KursyWEKROViewIterator",
            "pagingRangeStart": i * 10,
            "event": "positionIterRangeStartKwGB"
        }
        print(page_payload)

        response = session.post(base_url + relative_url, data=page_payload)
        save_to_html(response, f'{i}.{payload["rowId"]}.html')
        soup = BeautifulSoup(response.content, 'lxml')

        courses_table = soup.find('a', {"name": "hrefKursyWGrupieTabela"}).findNext('table')

        links = courses_table.find_all('a', {"title": "Wybierz wiersz"})

        for link in links:
            load_courses(session, link['href'])


def load_courses(session, href):
    relative_url = href
    index = relative_url.find("?")

    if index != -1:
        relative_url = relative_url[:index]

    payload = {
        'clEduWebSESSIONTOKEN': get_session_param(href)
    }

    response = session.get(base_url + href)
    soup = BeautifulSoup(response.content, 'lxml')

    courses_table = soup.find('a', {"name": "hrefGrupyZajecioweKursuTabela"})

    if courses_table is None:
        print("Brak grup zajeciowych")
        return

    courses_table = courses_table.findNext('table')
    pages = courses_table.find_all('input', {"class": "paging-numeric-btn"})
    for page in pages:
        print(' ' + str(page))

    for i in range(len(pages) + 1):
        page_payload = {
            "clEduWebSESSIONTOKEN": payload['clEduWebSESSIONTOKEN'],
            "pagingIterName": "GrupyZajecioweKursuWEKROViewIterator",
            "pagingRangeStart": i * 10,
            "event": "positionIterRangeStartGZK"
        }
        print('     ' + str(page_payload))

        response = session.post(base_url + relative_url, data=page_payload)
        save_to_html(response, f'{i}.html')
        soup = BeautifulSoup(response.content, 'lxml')


# pagingIterName: GrupyZajecioweKursuWEKROViewIterator
# pagingRangeStart: 10
# event: positionIterRangeStartGZK

# pagingIterName: KursyWEKROViewIterator
# pagingRangeStart: 20
# event: positionIterRangeStartKwGB

def login():
    with requests.session() as c:
        response = c.get(login_url)
        payload = get_payload(response)

        response = c.post(login_url, data=payload)
        soup = BeautifulSoup(response.content, 'html.parser')

        if soup.find(text="Wróć do strony głównej") is not None:
            main_page_link = soup.find('a')

            if main_page_link is not None:
                print(f"Going to strona główna: {base_url + main_page_link['href']}")
                response = c.get(base_url + main_page_link['href'])
                payload = get_payload(response)
                response = c.post(login_url, data=payload)
                soup = BeautifulSoup(response.content, 'html.parser')

        zapisy = soup.find('a', {"title": "Zapisy"})
        if zapisy is not None:
            print("Jestem na stronie")
        else:
            studia = soup.find('a', {"title": "Studia"})
            response = c.get(base_url + studia['href'])
            soup = BeautifulSoup(response.content, 'html.parser')

            zapisy = soup.find('a', {"title": "Zapisy"})
            if zapisy is not None:
                print("Jestem na stronie")

        # strona z zapisami
        response = c.get(base_url + zapisy['href'])
        soup = BeautifulSoup(response.content, 'lxml')

        semesters_table = soup.find('a', {"name": "hrefSemestryTabela"}).findNext('table')
        semesters = semesters_table.find_all('a', {"title": "Wybierz wiersz"})

        for semester in semesters:
            find_enrollments(c, semester['href'])


if __name__ == "__main__":
    login()
