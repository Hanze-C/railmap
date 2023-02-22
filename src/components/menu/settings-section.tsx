import React from 'react';
import { Box, Flex, Heading, SystemStyleObject } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { LanguageCode } from '@railmapgen/rmg-translate';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { handleLanguageChange } from '../../i18n/config';
import { Events } from '../../util/constants';

const style: SystemStyleObject = {
    flexDirection: 'column',

    '& h5': {
        mx: 1,
        my: 2,
    },

    '& > div': {
        px: 2,
    },
};

export default function SettingsSection() {
    const { t } = useTranslation();

    const fields: RmgFieldsField[] = [
        {
            type: 'select',
            label: t('Language'),
            value: rmgRuntime.getLanguage(),
            options: {
                en: 'English',
                'zh-Hans': '简体中文',
                'zh-Hant': '繁體中文',
                ko: '한국어',
            },
            onChange: value => {
                const language = value as LanguageCode;
                rmgRuntime.setLanguage(language);
                handleLanguageChange(language);
                rmgRuntime.event(Events.CHANGE_LANGUAGE, { language });
            },
        },
    ];

    return (
        <Flex sx={style}>
            <Heading as="h5" size="sm">
                {t('Settings')}
            </Heading>

            <Box>
                <RmgFields fields={fields} />
            </Box>
        </Flex>
    );
}
