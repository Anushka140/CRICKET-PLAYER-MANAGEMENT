from flask import Blueprint, request, jsonify
from app.models import Team

bp = Blueprint('teams', __name__, url_prefix='/teams')

@bp.route('/', methods=['GET'])
def get_teams():
    from app import db  # lazy import to avoid circular import
    teams = Team.query.all()
    return jsonify([{'id': t.id, 'name': t.name} for t in teams])

@bp.route('/', methods=['POST'])
def create_team():
    from app import db
    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({'error': 'Team name is required'}), 400
    if Team.query.filter_by(name=name).first():
        return jsonify({'error': 'Team already exists'}), 400

    team = Team(name=name)
    db.session.add(team)
    db.session.commit()
    return jsonify({'message': 'Team created', 'id': team.id}), 201

@bp.route('/<int:id>', methods=['PUT'])
def update_team(id):
    from app import db
    team = Team.query.get(id)
    if not team:
        return jsonify({'error': 'Team not found'}), 404

    data = request.get_json()
    team.name = data.get('name', team.name)
    db.session.commit()
    return jsonify({'message': 'Team updated'})

@bp.route('/<int:id>', methods=['DELETE'])
def delete_team(id):
    from app import db
    team = Team.query.get(id)
    if not team:
        return jsonify({'error': 'Team not found'}), 404

    db.session.delete(team)
    db.session.commit()
    return jsonify({'message': 'Team deleted'})
