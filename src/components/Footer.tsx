import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
	return (
		<footer className="bg-zinc-900 p-4 text-white h-32 flex flex-col items-center justify-center">
			<p className="text-center">Copyright {new Date().getFullYear()}</p>
		</footer>
	);
};
