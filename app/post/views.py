from flask_restplus import Namespace, Resource

api = Namespace('post', description='post description')


POST = [
    {
        'id': 1,
        'title': 'post 666'
    }
]


@api.route('/')
class PostList(Resource):
    "Post API"
    @api.doc('list post')
    def get(self):
        return 'get post all'
