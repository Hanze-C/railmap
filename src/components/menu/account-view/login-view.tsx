import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRootDispatch } from '../../../redux';
import { fetchLogin } from '../../../redux/account/account-slice';
import { RMSection, RMSectionBody, RMSectionHeader } from '@railmapgen/mantine-components';
import { Anchor, Button, PasswordInput, TextInput, Title } from '@mantine/core';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const emailValidator = (value: string) => !!value.match(EMAIL_REGEX);

const LoginView = (props: { setLoginState: (_: 'login' | 'register' | 'forgot-password') => void }) => {
    const toast = useToast();
    const { t } = useTranslation();
    const dispatch = useRootDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const areFieldsValid = !!email && emailValidator(email) && !!password;

    const handleLogIn = async () => {
        setIsLoading(true);
        try {
            const { error, username } = (await dispatch(fetchLogin({ email, password }))).payload as {
                error?: string;
                username?: string;
            };
            if (error) {
                toast({
                    title: error,
                    status: 'error' as const,
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: t('Welcome ') + username,
                    status: 'success' as const,
                    duration: 5000,
                    isClosable: true,
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RMSection>
            <RMSectionHeader>
                <Title order={3} size="h5">
                    {t('Log in')}
                </Title>
            </RMSectionHeader>

            <RMSectionBody direction="column" gap="xs">
                <TextInput
                    label={t('Email')}
                    value={email}
                    onChange={({ currentTarget: { value } }) => setEmail(value)}
                    error={email && !emailValidator(email)}
                />
                <PasswordInput
                    label={t('Password')}
                    value={password}
                    onChange={({ currentTarget: { value } }) => setPassword(value)}
                />
                <Anchor component="button" ml="auto" onClick={() => props.setLoginState('forgot-password')}>
                    {t('Forgot password') + '?'}
                </Anchor>

                <Button onClick={handleLogIn} loading={isLoading} disabled={!areFieldsValid || isLoading}>
                    {t('Log in')}
                </Button>
                <Button variant="default" onClick={() => props.setLoginState('register')} disabled={isLoading}>
                    {t('Create an account')}
                </Button>
            </RMSectionBody>
        </RMSection>
    );
};

export default LoginView;
