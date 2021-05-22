import uiuc_api
from flask import Flask, render_template, jsonify

# Documentation for uiuc-api: https://uiuc-api.readthedocs.io/en/latest/

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html'), 200

@app.route('/schedule')
def schedule():
  return render_template('schedule.html'), 200

@app.route('/courses/<course_name>')
def getCourse(course_name):
  try:
    course = uiuc_api.get_course(course_name, redirect=True)
  except ValueError:
    return jsonify({'error': 'Could not retrieve course data.'}), 404
  
  prereqs = []
  coreqs = []

  for i in range(len(course.prereqs)):
    prereqs.append(list(course.prereqs[i]))

  for i in range(len(course.coreqs)):
    coreqs.append(list(course.coreqs[i]))

  data = {
    'name': course.name,
    'label': course.label,
    'hours': course.hours,
    'description': course.description,
    'schedule_info': course.schedule_info,
    'prereqs': prereqs,
    'coreqs': coreqs,
    'constraints': course.constraints
  }

  return jsonify(data), 200

if __name__ == '__main__':
  app.run(debug=True)