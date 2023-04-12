import { FC, useEffect, useState } from 'react';
import { DashboardWidget } from '../containers/dashboard-widget.container';
import { useAppSelector } from '../../../+state';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { email_dto } from '@prisma/client';


interface EmailDetailComponentProps {
    data: email_dto[] | null;
}
export const EmailDetailComponent: FC<EmailDetailComponentProps> = ({ data }) => {

    const [selectedEmails, setSelectedEmails] = useState<email_dto[] | null>();
    const selected = useAppSelector(state => state.orderReducer.bulkSelection);

    useEffect(() => {
        setSelectedEmails(data?.filter(x => selected?.some(y => y === x.email)))
    }, [selected, data])
    return (
        <DashboardWidget headerText="Email details" subHeaderText="" linkText="" href="">
            <>
                {selectedEmails?.map((x, idx) => <div className="p-4" key={idx}>
                    <Typography>
                        Email: {x.email}
                    </Typography>
                    <Divider />
                </div>
                )}
            </>
        </DashboardWidget>
    )
}