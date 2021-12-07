import { Avatar, Chip } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import DialogComponent from "./dialogComponent";
const Input = styled("input")({
	display: "none",
});
const ProductDetailComponent = (props) => {
	const { product, dialogTitle, isEdit, actionButtons, image } = props;
	const defaultImage =
		"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

	// console.log(product.coverFile);
	return (
		<>
			<Card variant="outlined" sx={{ maxWidth: "100%" }}>
				<CardMedia
					component="div"
					image={image ? image : product.cover}
					sx={{
						height: "190px",
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "end",
					}}
				></CardMedia>
				<CardContent>
					<div className="p-2 flex flex-row">
						<div className="w-3/5">
							<div className="flex items-center space-x-4">
								<div>
									<h5 className="text-2xl font-bold text-gray-700">
										{product.name}
									</h5>
								</div>
								<DialogComponent
									title={dialogTitle}
									button={
										<IconButton color="primary" aria-label="delete">
											{isEdit ? <EditIcon /> : <InfoOutlinedIcon />}
										</IconButton>
									}
								>
									{props.children}
								</DialogComponent>
							</div>

							<div className="mt-1 flex flex-row items-center">
								<Avatar
									alt="Remy Sharp"
									src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
									// sx={{ width: 20, height: 20 }}
								/>

								<p className="text-sm text-gray-600 ml-2">{product.owner}</p>
							</div>

							<p className="mt-4 mb-1 text-base">{product.description}</p>
						</div>

						<div className="w-2/5 py-6">
							{actionButtons}
							{/* <div className='flex flex-row items-center px-4 float-right mb-2 mt-2'>
								<p className='text-sm text-gray-400 mr-3'>Update</p>
								<p className='text-sm text-gray-400 mr-3'>━━━━━━━━━━━━━━━━━━━━━</p>
								<Chip
									label='3 new'
									variant='outlined'
									sx={{ mr: 1, height: '20px', color: '#97a0a8' }}
								/>
							</div>

							<div className='flex flex-row items-center px-4 float-right mb-2'>
								<p className='text-sm text-gray-400 mr-3'>Recommendations</p>
								<p className='text-sm text-gray-400 mr-3'>━━━━━━━━━━━━━━━━━━━━━</p>
								<Chip
									label='3 new'
									variant='outlined'
									sx={{ mr: 1, height: '20px', color: '#97a0a8' }}
								/>
							</div>

							<div className='flex flex-row items-center px-4 float-right mb-2'>
								<p className='text-sm text-gray-400 mr-3'>Reads</p>
								<p className='text-sm text-gray-400 mr-3'>━━━━━━━━━━━━━━━━━━━━━</p>
								<Chip
									label='3 new'
									variant='outlined'
									sx={{ mr: 1, height: '20px', color: '#97a0a8' }}
								/>
							</div> */}
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default ProductDetailComponent;
