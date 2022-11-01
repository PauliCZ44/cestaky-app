import { Button, ButtonProps } from '@mantine/core'
import React from 'react'
import FluentSave28Regular from '~icons/fluent/save-28-regular'

function SaveButton(props: ButtonProps) {
    return (
        <Button leftIcon={<FluentSave28Regular />} type="submit" {...props}>
            Save
        </Button>
    )
}

export default SaveButton
