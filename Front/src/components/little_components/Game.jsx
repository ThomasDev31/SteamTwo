import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import rawgCalls from "../../api/rawgCalls";
import styled from "styled-components";

function Game() {
	const [datas, setDatas] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();

	const fetchData = async () => {
		if (id) {
			try {
				setLoading(true);
				const responses = await rawgCalls.getGame(id);
				if (responses.error != null) {
					setError(responses.error);
				} else {
					setDatas(responses[0].result);
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
	};
	useEffect(() => {
		fetchData();
	}, [id]);

	if (error) return <div>{error}</div>;
	if (loading) return <div>Loading ...</div>;

	return (
		<>
			<StyledModal>
				{error && <div>{error}</div>}
				{loading && (
					<div>
						<h2>Loading ...</h2>
					</div>
				)}
				{!error && !loading && datas && (
					<button onClick={() => navigate("/")}>Retirer</button>
				)}
			</StyledModal>
		</>
	);
}

const StyledModal = styled.div`
	max-width: 1240px;
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	position: relative;
`;
export default Game;
