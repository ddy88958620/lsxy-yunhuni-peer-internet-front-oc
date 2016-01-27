from flask import Blueprint

Post = Blueprint('post', __name__, url_prefix='/post')


@Post.route('/')
def post():
    return 'ello'


@Post.route('/new')
def postNew():
    return 'new post'
