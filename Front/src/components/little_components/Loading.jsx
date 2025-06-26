import Loading from "../../assets/logo_loading.png";
import styled from "styled-components";

const LoadingComponent = () => {
	return (
		<StyledLoading>
			<img src={Loading} alt="Loading" />
		</StyledLoading>
	);
};

export default LoadingComponent;

const StyledLoading = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 20px;

	img {
		width: 100px;
		animation: spin 2s linear infinite;
	}

	p {
		margin-top: 20px;
		font-size: 1.5rem;
		color: #333;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;
