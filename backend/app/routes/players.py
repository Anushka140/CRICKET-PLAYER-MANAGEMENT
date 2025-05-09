from flask import Blueprint, request, jsonify
from app import db
from app.models import Player, Team

bp = Blueprint('players', __name__, url_prefix='/players')

@bp.route('/', methods=['GET'])
def get_players():
    players = Player.query.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'team_id': p.team_id,
        'team_name': p.team.name
    } for p in players])

@bp.route('/', methods=['POST'])
def create_player():
    data = request.get_json()
    name = data.get('name')
    team_id = data.get('team_id')

    if not name or not team_id:
        return jsonify({'error': 'Name and team_id required'}), 400

    if not Team.query.get(team_id):
        return jsonify({'error': 'Team not found'}), 404

    player = Player(name=name, team_id=team_id)
    db.session.add(player)
    db.session.commit()
    return jsonify({'message': 'Player created', 'id': player.id}), 201

@bp.route('/<int:id>', methods=['PUT'])
def update_player(id):
    player = Player.query.get(id)
    if not player:
        return jsonify({'error': 'Player not found'}), 404

    data = request.get_json()
    player.name = data.get('name', player.name)
    team_id = data.get('team_id')
    if team_id:
        if not Team.query.get(team_id):
            return jsonify({'error': 'Team not found'}), 404
        player.team_id = team_id

    db.session.commit()
    return jsonify({'message': 'Player updated'})
