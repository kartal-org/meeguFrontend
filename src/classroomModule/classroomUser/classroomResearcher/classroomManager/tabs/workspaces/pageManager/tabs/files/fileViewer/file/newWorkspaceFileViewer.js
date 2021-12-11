import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import { VscNotebook } from "react-icons/vsc";
import { MdOutlineCommentBank, MdOutlineTipsAndUpdates } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retrieveFile } from "../../../../../../../../../../../store/newFileSlice";
import { useEffect } from "react";
import DialogComponent from "../../../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent";
import NewFileEditor from "./component/newFileEditor";
import NewFileName from "./component/newFileName";

import FloatComments from "./newFloatingActions/floatComment";
import FloatNotes from "./newFloatingActions/floatNotes";
import FloatTips from "./newFloatingActions/floatTips";

const NewWorkspaceFileViewer = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { id } = useParams();
	useEffect(() => {
		dispatch(retrieveFile(`/workspace/file/${id}`));
	}, []);
	const status = useSelector((state) => state.file.status);
	return (
		<>
			<div className="flex flex-col space-y-4">
				<div className="flex space-x-2 items-center ">
					<NewFileName />
					{status === "edit loading" ? <p>saving</p> : null}
					{status === "edit success" ? <p>saved</p> : null}
					{status === "edit failed" ? <p>saved failed</p> : null}
				</div>

				<div style={{ width: "94%" }}>
					<NewFileEditor />
				</div>
			</div>
			<>
				<div className="sticky right-2 bottom-36">
					<div className="flex w-full justify-end">
						<DialogComponent
							title="Comments"
							button={
								<Tooltip title="Comments" placement="left">
									<Fab color="primary" aria-label="add">
										<MdOutlineCommentBank className="h-6 w-6" />
									</Fab>
								</Tooltip>
							}
						>
							<FloatComments />
						</DialogComponent>
					</div>
				</div>
				<div className="sticky right-4 bottom-20">
					<div className="flex w-full justify-end">
						<DialogComponent
							title="Notes"
							button={
								<Tooltip title="Notes" placement="left">
									<Fab color="secondary" aria-label="edit">
										<VscNotebook className="h-6 w-6" />
									</Fab>
								</Tooltip>
							}
						>
							<FloatNotes />
						</DialogComponent>
					</div>
				</div>
				<div className="sticky right-4 bottom-4 ">
					<div className="flex w-full justify-end">
						<DialogComponent
							title="Adviser's Tips"
							button={
								<Tooltip title="Adviser's Tips" placement="left">
									<Fab color="info" aria-label="edit">
										<MdOutlineTipsAndUpdates className="h-6 w-6" />
									</Fab>
								</Tooltip>
							}
						>
							<FloatTips />
						</DialogComponent>
					</div>
				</div>
			</>
		</>
	);
};

export default NewWorkspaceFileViewer;
