import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Jobs() {
    const { t } = useTranslation();

    return (
        <div>
            <Typography variant="h1">{t("home.title")}</Typography>
        </div>
    );
}