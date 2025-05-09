from flask import Blueprint, request, jsonify
from app import db
from app.models import Match, Team

bp = Blueprint('matches', __name__, url_prefix='/matches')

@bp.route('/', methods=['GET'])
def get_match():
    matches = Match.query.all()
    result = []
    for m in matches:
        team1 = Team.query.get(m.team1_id)
        team2 = Team.query.get(m.team2_id)
        result.append({
            'id': m.id,
            'team1': team1.name if team1 else None,
            'team2': team2.name if team2 else None,
            'team1_score': m.team1_score,
            'team2_score': m.team2_score
        })
    return jsonify(result)

@bp.route('/', methods=['POST'])
def create_match():
    data = request.get_json()
    team1_id = data.get('team1_id')
    team2_id = data.get('team2_id')
    team1_score = data.get('team1_score')
    team2_score = data.get('team2_score')

    if not all([team1_id, team2_id, team1_score is not None, team2_score is not None]):
        return jsonify({'error': 'All fields are required'}), 400

    if team1_id == team2_id:
        return jsonify({'error': 'Teams must be different'}), 400

    match = Match(
        team1_id=team1_id,
        team2_id=team2_id,
        team1_score=team1_score,
        team2_score=team2_score
    )
    db.session.add(match)
    db.session.commit()
    return jsonify({'message': 'Match created', 'id': match.id}), 201

@bp.route('/<int:id>', methods=['PUT'])
def update_match(id):
    match = Match.query.get(id)
    if not match:
        return jsonify({'error': 'Match not found'}), 404

    data = request.get_json()

    team1_id = data.get('team1_id')
    team2_id = data.get('team2_id')
    team1_score = data.get('team1_score')
    team2_score = data.get('team2_score')

    if team1_id and team2_id and team1_id == team2_id:
        return jsonify({'error': 'Teams must be different'}), 400

    if team1_id:
        if not Team.query.get(team1_id):
            return jsonify({'error': 'Team 1 not found'}), 404
        match.team1_id = team1_id

    if team2_id:
        if not Team.query.get(team2_id):
            return jsonify({'error': 'Team 2 not found'}), 404
        match.team2_id = team2_id

    if team1_score is not None:
        match.team1_score = team1_score

    if team2_score is not None:
        match.team2_score = team2_score

    db.session.commit()
    return jsonify({'message': 'Match updated'})