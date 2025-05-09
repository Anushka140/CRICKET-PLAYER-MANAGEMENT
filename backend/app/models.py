from flask_sqlalchemy import SQLAlchemy
from app import db  # ✅ this is now safe after moving imports inside create_app

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    players = db.relationship('Player', backref='team',lazy=True, cascade='all, delete-orphan')

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    position = db.Column(db.String(100), nullable=True)

    # Remove the backref here; no need to define it again
    # team = db.relationship('Team', backref='players') # This line is no longer necessary
class Match(db.Model):
    __tablename__= 'matches' # explicitly bind to you table in MySQL
    id = db.Column(db.Integer, primary_key=True)
    team1_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    team2_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    team1_score = db.Column(db.Integer, nullable=False)
    team2_score = db.Column(db.Integer, nullable=False)
    winner_id = db.Column(db.Integer, db.ForeignKey('team.id'))
    team1 = db.relationship('Team', foreign_keys=[team1_id])
    team2 = db.relationship('Team', foreign_keys=[team2_id])
    winner = db.relationship('Team', foreign_keys=[winner_id])
