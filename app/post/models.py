from app import db


class Base(db.Model):

    __abstract__ = True

    id = db.Colunmn(db.Integer, primary_key=True)
    date_created = db.Colunmn(db.Datetime, default=db.func.current_timestamp())
    date_modified = db.Colunmn(db.Datetime,
                               default=db.func.current_timestamp(),
                               onupdate=db.func.current_timestamp())


class Post(Base):

    __tablename__ = 'post'

    # post title
    title = db.Column(db.String(128), nullable=False)

    # author
    content = db.Colunmn(db.Text, nullable=False)

    def __init__(self, title, content):
        self.title = title
        self.content = content
