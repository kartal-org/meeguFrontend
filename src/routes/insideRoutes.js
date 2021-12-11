import Notifications from '../experiments/Notifications';
import { Route } from 'react-router';
import StepperExp from '../experiments/stepperExp';
import AboutArticles from '../materialUI/pages/AboutArticles';
import NewMesssages from '../materialUI/pages/messages/NewMesssages';
import NewLibrary from '../materialUI/pages/NewLibrary';
import Notes from '../materialUI/pages/notes/Notes';
import ProjectManager from '../materialUI/pages/workspaceModule/pageManagers/projectManager';
import WorkspaceFileEditor from '../materialUI/pages/workspaceModule/workspaceFileEditor';
import Classroom from '../classroomModule/classroom';
import FileViewer from '../pages/fileViewer';
import Home from '../pages/home';
import OldInstitution from '../pages/institution';
import Logout from '../pages/logout';
import Profile from '../pages/profile';
import TempFile from '../pages/TempFile';
import WorkSpace from '../pages/workspace';
import JoinProfile from '../materialUI/pages/JoinedInstitution/JoinProfile';
import Institution from '../institutionModule/institution';
import MyInstitutionManager from '../materialUI/pages/institutionModule/pageManager/myInstitutionManager';
import AdviserClassroomManager from '../classroomModule/classroomUser/classroomAdviser/classroomManager/adviserClassroomManager';
import AdviserResourceManager from '../classroomModule/classroomUser/classroomAdviser/classroomManager/tabs/resources/resourceManager/adviserResourceManager';
import AdviserResourceFileViewer from '../classroomModule/classroomUser/classroomAdviser/classroomManager/tabs/resources/resourceManager/fileViewers/file/adviserResourceFileViewer';
import ResearcherClassroomManager from '../classroomModule/classroomUser/classroomResearcher/classroomManager/researcherClassroomManager';
import ResearcherResourceManager from '../classroomModule/classroomUser/classroomResearcher/classroomManager/tabs/resources/resourceManager/researcherResourceManager';
import ResearcherResourceFileViewer from '../classroomModule/classroomUser/classroomResearcher/classroomManager/tabs/resources/resourceManager/fileViewer/file/resourceFileViewer';

import Intro from '../experiments/shepherd/Intro';
import ResearcherWorkspaceManager from '../classroomModule/classroomUser/classroomResearcher/classroomManager/tabs/workspaces/pageManager/researcherWorkspaceManager';
import ResearcherWorkspaceFileViewer from '../classroomModule/classroomUser/classroomResearcher/classroomManager/tabs/workspaces/pageManager/tabs/files/fileViewer/file/researcherWorkspaceFileViewer';
import ModeratorInstitutionPageManager from '../institutionModule/institutionModerator/pageManager/moderatorInstitutionManager';
import DataGridExp from '../experiments/dataGrid';
import Validation from '../experiments/validation/Validation';
import Validate from '../experiments/validation/Validate';

import ModeratorInstitutionDepartmentManager from '../institutionModule/institutionModerator/pageManager/tabs/departments/pageManager/moderatorInstitutionDepartmentManager';
import AdviserSubmissionViewer from '../classroomModule/classroomUser/classroomAdviser/classroomManager/tabs/submissions/fileViewer/adviserSubmissionViewer';
import ModeratorSubmissionViewerFile from '../institutionModule/institutionModerator/pageManager/tabs/submissions/fileViewer/moderatorSubmissionViewerFile';
import ModeratorInstitutionArticleViewer from '../institutionModule/institutionModerator/pageManager/tabs/wall/moderatorInstitutionArticleViewer';
import ResearcherWorkspaceUploadFileViewer from '../classroomModule/classroomUser/classroomResearcher/classroomManager/tabs/workspaces/pageManager/tabs/files/fileViewer/uploadFile/workspaceUploadFileViewer';
import AdviserSubmissionPDFViewer from '../classroomModule/classroomUser/classroomAdviser/classroomManager/tabs/submissions/fileViewer/adviserSubmissionViewerPDF';
import DepartmentRecommendationPDFViewer from '../institutionModule/institutionModerator/pageManager/tabs/departments/pageManager/tabs/submissions/fileViewers/departmentFileViewerPDF';
import InstitutionStaffManager from '../institutionModule/institutionStaff/pageManager/institutionStaffManager';
import JoinedDepartmentTabManager from '../institutionModule/institutionStaff/pageManager/tabs/department/joinedDepartmentTabManager';
import FinalMessage from '../finalmessageModule/finalMessage';
import AdviserWorkspaceManager from '../classroomModule/classroomUser/classroomAdviser/classroomManager/tabs/workspaces/adviserWorkspaceManager';
import DepartmentResourceManager from '../institutionModule/institutionModerator/pageManager/tabs/departments/pageManager/tabs/resources/resourceManager/departmentResourceManager';
import SearchPage from '../search/search';
import NewWorkspaceFileViewer from '../classroomModule/classroomUser/classroomResearcher/classroomManager/tabs/workspaces/pageManager/tabs/files/fileViewer/file/newWorkspaceFileViewer';

export default [
	<Route
		exact
		path='/institutions/moderator/article/:id'
		component={ModeratorInstitutionArticleViewer}
	/>,

	<Route exact path='/classroom/adviser/submission/:id' component={AdviserSubmissionViewer} />,
	<Route
		exact
		path='/classroom/adviser/submission/pdf/:id'
		component={AdviserSubmissionPDFViewer}
	/>,
	<Route
		exact
		path='/institutions/moderator/department/submission/pdf/:id'
		component={DepartmentRecommendationPDFViewer}
	/>,
	<Route
		exact
		path='/institutions/moderator/submission/:id'
		component={ModeratorSubmissionViewerFile}
	/>,
	<Route
		exact
		path='/classroom/researcher/workspace/:id'
		component={ResearcherWorkspaceManager}
	/>,
	<Route exact path='/institution/staff/department/:id' component={JoinedDepartmentTabManager} />,
	<Route
		exact
		path='/institution/moderator/department/resources/:id'
		component={DepartmentResourceManager}
	/>,
	<Route
		exact
		path='/institutions/moderator/department/:id'
		component={ModeratorInstitutionDepartmentManager}
	/>,
	<Route exact path='/classroom/adviser/workspace/:id' component={AdviserWorkspaceManager} />,
	<Route exact path='/classroom/adviser/resources/:id' component={AdviserResourceManager} />,
	<Route exact path='/classroom/researcher/resources/:id' component={ResearcherResourceManager} />,
	<Route exact path='/article/:id' component={AboutArticles} />,
	<Route exact path='/temp' component={TempFile} />,
	<Route exact path='/validation' component={Validation} />,
	<Route exact path='/validate' component={Validate} />,
	<Route exact path='/experiments' component={StepperExp} />,
	<Route exact path='/works/fileEditor/:id' component={WorkspaceFileEditor} />,
	<Route
		exact
		path='/classroom/adviser/resources/file/:id'
		component={AdviserResourceFileViewer}
	/>,

	<Route path='/notif' component={Notifications} />,
	<Route path='/intro' component={Intro} />,
	// <Route exact path='/classroom/researcher/:id' component={ClassroomManagerResearcher} />,

	<Route
		exact
		path='/classroom/researcher/resources/file/:id'
		component={ResearcherResourceFileViewer}
	/>,
	<Route
		exact
		path='/classroom/researcher/workspace/file/:id'
		component={ResearcherWorkspaceFileViewer}
	/>,
	<Route
		exact
		path='/classroom/researcher/workspace/upload-file/:id'
		component={ResearcherWorkspaceUploadFileViewer}
	/>,

	<Route exact path='/works/:id' component={ProjectManager} />,

	<Route exact path='/fileViewer' component={FileViewer} />,
	<Route exact path='/works' component={WorkSpace} />,
	<Route exact path='/messages' component={FinalMessage} />,
	<Route exact path='/classroom/researcher/:id' component={ResearcherClassroomManager} />,
	<Route exact path='/classroom/adviser/:id' component={AdviserClassroomManager} />,
	<Route exact path='/classroom' component={Classroom} />,
	<Route path='/library' component={NewLibrary} />,
	<Route exact path='/notes' component={Notes} />,
	<Route path='/home' component={Home} />,
	<Route path='/profile' component={Profile} />,
	<Route path='/search/:key' component={SearchPage} />,
	<Route path='/joined/:id' component={JoinProfile} />,
	<Route path='/newFileViewerWorkspace' component={NewWorkspaceFileViewer} />,

	// <Route path='/myinstitution/:id' component={MyInstitutionManager} />,
	<Route exact path='/institutions' component={Institution} />,
	<Route exact path='/data-table' component={DataGridExp} />,
	<Route exact path='/institution/staff/:id' component={InstitutionStaffManager} />,
	<Route exact path='/institutions/moderator/:id' component={ModeratorInstitutionPageManager} />,
	// <Route path='/old-institutions' component={OldInstitution} />,
	<Route path='/logout' component={Logout} />,
];
