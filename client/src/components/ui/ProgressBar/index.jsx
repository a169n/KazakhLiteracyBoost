import { cn } from '@/utils/mergeStyles';
import { useState, useEffect } from 'react';

const ProgressBar = ({ progress, className }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(progress);
    }, [progress]);

    return (
        <div className={cn(`w-full h-[56px] bg-[#FFF9D7] rounded-[16px] ${className}`)}>
            <div
                className="h-full rounded-[16px] bg-[#F8DB39]"
                style={{ width: `${width}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
