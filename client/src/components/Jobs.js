import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Job from './Job';

export default function Jobs({jobs}) {
    const { t } = useTranslation();

    return (
        <div className='job-list'>
            <Typography variant="h3">{t("home.title")}</Typography>
            { jobs && jobs.map((job) => <Job job={job}/>)
            }
        </div>
    );
}