"use client";

import PositionsTable from "@/app/components/position/table";
import { Box } from '@mui/material';

const PositionsList: React.FC = () => {
    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main>
                <Box display="flex" justifyContent="center" alignItems="center" >
                    <Box width="80%">
                        <text>Positions list</text>
                        <PositionsTable />
                    </Box></Box>
            </main>
        </div>
    );
}

export default PositionsList; 