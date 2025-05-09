from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import pymysql
pymysql.install_as_MySQLdb()


# Initialize the SQLAlchemy object
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)  # Corrected '_name' to '_name_'
    app.config.from_object('config.Config')  # Assuming 'config.Config' has your configurations like SQLAlchemy URI

    # Initialize the database and Flask-Migrate
    db.init_app(app)
    migrate = Migrate(app, db)  # Initialize Flask-Migrate

    # Enable CORS
    CORS(app)

    # Import routes inside the function to avoid circular import
    from app.routes.teams import bp as teams_bp
    from app.routes.players import bp as players_bp
    from app.routes.matches import bp as matches_bp

    # Register blueprints
    app.register_blueprint(teams_bp)
    app.register_blueprint(players_bp)
    app.register_blueprint(matches_bp)

    # Home route
    @app.route('/')
    def index():
        return 'Welcome to the Cricket Player Management API!'

    return app