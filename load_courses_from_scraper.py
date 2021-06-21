import requests
import json
import sys

LOGIN_URL = "http://127.0.0.1:8000/api/token/"
COURSES_URL = "http://127.0.0.1:8000/api/courses/"
TEACHERS_URL = "http://127.0.0.1:8000/api/teachers/"
LESSONS_URL = "/lessons/"


def get_token(username, password):
    response = requests.post(LOGIN_URL, data={"username": username, "password": password})
    json_data = json.loads(response.text)
    return json_data['access']


def create_teacher(teacher, access_token):
    payload = {
        "name": teacher[1],
        "title": teacher[0]
    }

    response = requests.post(TEACHERS_URL, data=payload, headers={'Authorization': f'Bearer {access_token}'})
    json_data = json.loads(response.text)
    print(json_data)
    return json_data['id']


def get_teacher_id(teacher_name, access_token):
    response = requests.get(TEACHERS_URL, headers={'Authorization': f'Bearer {access_token}'})
    json_data = json.loads(response.text)

    for teacher in json_data:
        if teacher_name == teacher['name']:
            return teacher['id']

    return None


def get_course_id(course_data, access_token):
    response = requests.get(COURSES_URL, headers={'Authorization': f'Bearer {access_token}'})
    json_data = json.loads(response.text)

    for course in json_data:
        if all([course[key] == course_data[key] for key in course_data.keys()]):
            return course['id']

    return None


def create_course(course, access_token):
    if course['teacher_id'] != "":
        teacher = course['teacher_id'].split()
        teacher = [
            ' '.join(teacher[:-2]),
            ' '.join(teacher[-2:])
        ]

        teacher_id = get_teacher_id(teacher[1], access_token)
        if teacher_id is None:
            teacher_id = create_teacher(teacher, access_token)
    else:
        teacher_id = None

    payload = {
        "name": course["name"],
        "lesson_type": course["lesson_type"],
        "code": course["code"]
    }

    if teacher_id is not None:
        payload["teacher"] = int(teacher_id)

    response = requests.post(COURSES_URL, data=payload, headers={'Authorization': f'Bearer {access_token}'})
    json_data = json.loads(response.text)

    return json_data['id']


def get_lesson_id(lesson_data, course_id, access_token):
    response = requests.get(f'{COURSES_URL}{course_id}{LESSONS_URL}', headers={'Authorization': f'Bearer {access_token}'})
    json_data = json.loads(response.text)

    for lesson in json_data:
        if all([lesson[key] == lesson_data[key] for key in lesson_data.keys()]):
            return lesson['id']

    return None


def create_lesson(lesson, course_id, access_token):
    lesson_payload = {
        "when": lesson['when'],
        "start_time": lesson['start_time'],
        "end_time": lesson['end_time'],
        "building": lesson['building'],
        "room": lesson['room']
    }

    response = requests.post(f'{COURSES_URL}{course_id}{LESSONS_URL}', data=lesson_payload,
                  headers={'Authorization': f'Bearer {access_token}'})
    json_data = json.loads(response.text)

    return json_data['id']


def main():
    if len(sys.argv) < 4:
        username = input("username: ")
        password = input("password: ")
        filename = input("filename: ")
    else:
        username = sys.argv[1]
        password = sys.argv[2]
        filename = sys.argv[3]

    with open(filename, 'r') as f:
        courses = json.load(f)

    access_token = get_token(username, password)

    for course in courses:
        course_id = get_course_id({"name": course["name"], "lesson_type": course["lesson_type"]}, access_token)

        if course_id is None:
            # add new course
            course_id = create_course(course, access_token)
            print(f"Created course with id={course_id}")

        if course_id is not None:
            print(f"Going over lessons for course with id={course_id}")
            for lesson in course['lesson']:
                lesson_id = get_lesson_id({
                    "when": lesson["when"],
                    "start_time": lesson["start_time"],
                    "end_time": ["end_time"]
                }, course_id, access_token)

                if lesson_id is None:
                    # create new lesson
                    lesson_id = create_lesson(lesson, course_id, access_token)
                    print(f'Created lesson with id={lesson_id}')


if __name__ == "__main__":
    main()
