import config

from flask import Flask
from config import SQLALCHEMY_BINDS
from config.database import db_conn
from controller import bp_init

def run():

    app = Flask(__name__)

    # Database
    config.db = db_conn(app)
    app.config[ 'SQLALCHEMY_BINDS' ] = SQLALCHEMY_BINDS

    # Blueprint
    bp_init(app)

    app.run(debug=True,host='0.0.0.0', port=5000)

if __name__ == '__main__':
    run()

