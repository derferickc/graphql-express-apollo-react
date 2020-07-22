import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import className from 'classnames'

const LAUNCHES_QUERY = gql`
    query LaunchesQuery($flight_number: Int!) {
        launch(flight_number: $flight_number) {
            flight_number
            mission_name
            launch_year
            launch_date_local
            launch_success
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;

export default function Launch(props) {
    let { flight_number } = props.match.params;
    flight_number = parseInt(flight_number);
    
    const { loading, error, data } = useQuery(LAUNCHES_QUERY, {
        variables: { flight_number }
    });

    if(loading) return <h4>Loading...</h4>
    if(error) return <h4>Error: {error}</h4>
    console.log(data.launch)
    const {
        mission_name,
        launch_year,
        launch_success,
        rocket: { rocket_id, rocket_name, rocket_type}
    } = data.launch

    return (
        <div className="card card-body mb-3">
            <h1 className="display-4 my-3">Mission: <span className="text-dark">{mission_name}</span></h1>
            <h4 className="mb-3">Launch Details</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    Flight Number: {flight_number}
                </li>
                <li className="list-group-item">
                    Launch Year: {launch_year}
                </li>
                <li className="list-group-item">
                    Launch Successful: {` `}
                    <span className={className({
                        'text-success': launch_success,
                        'text-danger': !launch_success
                    })}>
                        {launch_success ? 'YES' : 'NO'}
                    </span>
                </li>
            </ul>
            
            <h4 className="my-3">Rocket Details</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    Rocket ID: {rocket_id}
                </li>
                <li className="list-group-item">
                    Rocket Name: {rocket_name}
                </li>
                <li className="list-group-item">
                    Rocket Type: {rocket_type}
                </li>
            </ul>
            <hr/>
            <div>
                <Link className="btn btn-secondary" to="/">Back</Link>
            </div>
        </div>
    )
}