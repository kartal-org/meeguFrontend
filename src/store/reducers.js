import { combineReducers } from 'redux';
import authReducer from './authSlice';
import worksReducer from './workspaceSlice';
import classReducer from './classroomSlice';
import newClassReducer from './newClassroomSlice';
import classMemberReducer from './classroomMemberSlice';
import noteReducer from './noteSlice';
import classResourceReducer from './classResourceSlice';
import resourceReducer from './newResourceSlice';
import messageReducer from './messageSlice';
import worksMemberReducer from './workspaceMemberSlice';
import articleReducer from './articleSlice';
import libraryReducer from './librarySlice';
import fileManagerReducer from './fileManagerSlice';
import institutionReducer from './newInstitutionSlice';
import subscriptionReducer from './subscriptionSlice';
import folderReducer from './newFolderSlice';
import fileReducer from './newFileSlice';
import submissionReducer from './submissionSlice';
import recommendationReducer from './recommendationSlice';
import departmentReducer from './departmentSlice';
import staffReducer from './staffSlice';
import memberReducer from './memberSlice';
import responseReducer from './responseSlice';

export default combineReducers({
	auth: authReducer,
	works: worksReducer,
	class: classReducer,
	newClass: newClassReducer,
	classMember: classMemberReducer,
	note: noteReducer,
	resource: classResourceReducer,
	newResource: resourceReducer,
	message: messageReducer,
	worksMember: worksMemberReducer,
	article: articleReducer,
	folder: folderReducer,
	file: fileReducer,
	library: libraryReducer,
	fileManager: fileManagerReducer,
	institution: institutionReducer,
	subscription: subscriptionReducer,
	submission: submissionReducer,
	recommendation: recommendationReducer,
	department: departmentReducer,
	staff: staffReducer,
	member: memberReducer,
	response: responseReducer,
});
