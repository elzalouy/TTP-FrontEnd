import { Link, Typography } from '@mui/material'
import { FC } from 'react'
import { RouteComponentProps } from 'react-router'

interface Props {
    history: RouteComponentProps["history"]
}

export const EmailMessage: FC<Props> = ({ history }) => {

    return (
        <p className="success-text">
            A reset link has been sent to your email successfully
        </p>

    )
}