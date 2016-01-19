from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configurations
app.config.from_object('config')

# Define the database object which is imported
db = SQLAlchemy(app)


# Sample Http error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

# Register blueprint(s)

from app.post.controllers import Post

app.register_blueprint(Post)
