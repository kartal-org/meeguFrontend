import { Card, CardMedia } from "@mui/material";

const NewBannerComponent = (props) => {
	const { image, title, subtitle } = props;
	// const defaultImage =
	// 	"https://images.unsplash.com/photo-1492999104346-cabaa757be8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fG1pbmltYWxpc3R8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=1500&q=600";
	const defaultImage =
		"https://images.unsplash.com/photo-1494506281370-d80348b928fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQzfHxtaW5pbWFsaXN0fGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=1500&q=600";

	return (
		<>
			<Card sx={{ borderRadius: "0.75rem" }}>
				<CardMedia
					component="div"
					height="345"
					image={image ? image : defaultImage}
					alt="green iguana"
				>
					<div className="grid grid-cols-4 gap-2 w-full h-full p-6">
						<div className="col-span-3 flex flex-col justify-between space-y-2">
							<h3 className="text-3xl text-white font-bold tracking-wider">
								{title}
							</h3>
							<h5 className="text-sm text-gray-300 tracking-wider">
								{subtitle}
							</h5>
						</div>
						<div className="col-span-1 flex justify-end items-center space-x-3">
							{props.children}
						</div>
					</div>
				</CardMedia>
			</Card>
		</>
	);
};

export default NewBannerComponent;
