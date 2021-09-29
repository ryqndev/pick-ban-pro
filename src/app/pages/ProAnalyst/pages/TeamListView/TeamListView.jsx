import clsx from 'clsx';
import { useQuery } from 'react-query';
import cn from './TeamListView.module.scss';

const TeamListView = () => {
    const { isLoading, error, data: teams } = useQuery();

	return (
		<main className={cn.container}>
			<h1 className={cn.title}>Tournaments</h1>
			<div>{/* Spacing unit but should be leftmost nav */}</div>
			<div>
				<div className={cn.list}>
					<div className={clsx(cn['list-item'], cn.header)}>
						<p>Start</p>
						<p>End</p>
						<p>Name</p>
						<p>Region</p>
					</div>
					{isLoading && (
						<p className={cn['error-message']}>Loading...</p>
					)}
					{error && (
						<p className={cn['error-message']}>
							Something went wrong...
						</p>
					)}
				</div>
			</div>
			<aside>
			</aside>
		</main>
	);
};

export default TeamListView;
