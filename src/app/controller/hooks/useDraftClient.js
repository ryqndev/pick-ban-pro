import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../libs/firestore.js';
import { doc, onSnapshot } from 'firebase/firestore';
import useDraftTimer from './useDraftTimer';
import useDraftRenderData from './useDraftRenderData';
import { BLUE_SIDE_PICKS } from '../draftLogicControllerUtil.js';

const useDraftClient = setNav => {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const { setDraft, draft, currentPick, teamRenderData } =
		useDraftRenderData();

	useEffect(
		() =>
			onSnapshot(doc(db, 'livedrafts', id), doc => {
				setData(doc.data());
			}),
		[id]
	);

	useEffect(() => {
		if (!data || data.settingUp) return;
		const { position, draft } = data;
		setDraft({ d: draft, p: position });
		setNav({
			type: 'draft',
			side: BLUE_SIDE_PICKS.has(position) ? 'blue' : 'red',
			names: data.details.names,
		});
	}, [data, setDraft, setNav]);

	// const {
	//     on,
	//     time,
	//     end,
	//     limit,
	// } = useDraftTimer();

	return {
		render: teamRenderData,
		data,
		draft,
		currentPick,
	};
};

export default useDraftClient;
