from flask import Blueprint

Post = Blueprint('post', __name__, url_prefix='/post')


@Post.route('/', methods=['get'])
def post():
    return 'ello'
