import React from 'react'
import { gql, useQuery } from '@apollo/client';
import LaunchItem from './Launchitem';
import MissionKey from './Missionkey';

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`;

export default function Launches() {
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);

    if(loading) return <h4>Loading...</h4>
    if(error) return <h4>Error: {error}</h4>

    return (
        <React.Fragment>
            <MissionKey />
            {
                data.launches.map((launch) => (
                    <LaunchItem
                        key={launch.flight_number}
                        launch={launch}
                    />
                ))
            }
        </React.Fragment>
    )
}