from flask import Flask, render_template, Blueprint
from flask.ext.sqlalchemy import SQLAlchemy
from flask_restplus import Api

app = Flask(__name__, template_folder='../templates',
            static_folder='../static')

# Configurations
app.config.from_object('config')


# Define the database object which is imported
db = SQLAlchemy(app)


# api for swagger

app_bp = Blueprint('api', __name__, url_prefix='/api/1')

api = Api(app_bp, version='1.0', title='Todo API',
          description='A simple TODO API extracted \
          from the original flask-restful example')


# Sample Http error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404


@app.route('/')
def index():
    return render_template('index.html')


def swagger_init():
    from post.views import api as post_api
    from user.views import api as user_api

    api.add_namespace(post_api)
    api.add_namespace(user_api)

    app.register_blueprint(app_bp)
