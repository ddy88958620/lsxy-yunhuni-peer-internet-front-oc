from flask_restplus import Namespace, Resource, reqparse, fields

api = Namespace('user', description='user description')

parser = reqparse.RequestParser()


User = [
    {
        'id': 1,
        'title': 'user 666'
    }
]

user_fields = api.model('post', {
    'name': fields.String
})


@api.route('/list')
class UserList(Resource):
    "UserList API"
    def get(self):
        return 'user list'

    def post(self):
        return 'user post'


@api.route('/<int:uid>')
@api.response(404, 'user not found')
class User(Resource):
    "User API"
    def get(self, uid):
        return 'get one user'

    def delete(self, uid):
        return 'delete one user'

    def put(self, uid):
        return 'edit one user data'
