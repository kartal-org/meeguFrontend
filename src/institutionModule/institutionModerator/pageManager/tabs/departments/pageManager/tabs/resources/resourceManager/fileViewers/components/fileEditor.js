import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import { useSelector, useDispatch } from 'react-redux';
import 'quill/dist/quill.snow.css';
import { editfile } from '../../../../../../../../../../../store/newFileSlice';
import { useParams } from 'react-router';
// import './styles.css';

const NewFileEditor = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const fetchedFile = useSelector((state) => state.file.currentFile);

	// quill
	const [i, setI] = useState(0);
	const modules = {
		toolbar: [
			[{ font: [] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ align: [] }],

			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ indent: '-1' }, { indent: '+1' }],

			// [{ size: ['small', false, 'large', 'huge'] }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			['link', 'image', 'video', 'blockquote', 'code-block'],
			[{ color: [] }, { background: [] }],
		],
		clipboard: {
			matchVisual: false,
		},
	};

	const placeholder = 'Compose an epic...';
	const theme = 'snow';
	const { quill, quillRef } = useQuill({ placeholder, theme, modules });

	useEffect(() => {
		if (quill) {
			quill.on('text-change', (delta, oldDelta, source) => {
				// setFile({ ...file, content: quill.root.innerHTML });
				getUpdate(quill.root.innerHTML);
			});
		}
	}, [fetchedFile, quill]);
	useEffect(() => {
		if (fetchedFile && quill) {
			quill.clipboard.dangerouslyPasteHTML(fetchedFile.content);
			quill.setSelection(quill.getLength(), 0);
			// setI(1);

			quill.on('text-change', (delta, oldDelta, source) => {
				// setFile({ ...file, content: quill.root.innerHTML });
				if (fetchedFile !== quill.root.innerHTML) {
					getUpdate(quill.root.innerHTML);
				}
			});
		}
	}, [fetchedFile, quill]);

	const getUpdate = (text) => {
		let formdata = new FormData();
		formdata.append('content', text);
		dispatch(editfile(`/resource/department/file/change/${id}`, formdata));
		// console.log(text, 'UPdated text');
	};
	return (
		<div className='w-full h-screen'>
			<div ref={quillRef} />
		</div>
	);
};

export default NewFileEditor;
