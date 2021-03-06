import { useState } from 'react';
import './Switch.css';

export default function Switch({ priority, onChange }){

    return(
        <div className="flex">
            <label 
                className="flex items-center cursor-pointer"
            ><div className="mr-3 text-gray-700 font-medium">Normal</div>
                <div className="relative">
                <input type="checkbox" onChange={()=>onChange(!priority)} checked={priority} className="sr-only" />
                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div className="dot absolute w-6 h-6 bg-gray-100 rounded-full shadow -left-1 -top-1 transition"></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">Priority</div>
            </label>
        </div>
    );
};