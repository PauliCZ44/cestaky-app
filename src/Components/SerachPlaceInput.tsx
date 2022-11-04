import { Autocomplete, AutocompleteProps, TextInput } from '@mantine/core'
import { useDebouncedValue, useInputState } from '@mantine/hooks'
import React, { useEffect, useMemo, useState } from 'react'
import { createPlaceRequest, token } from '../utils/constants'
import { PlaceAutoCompleteItem } from './shared/PlaceAutoCompleteItem'

export function SerachPlaceInput(props: AutocompleteProps) {
    const [value, setValue] = useState<string>('')
    const [debounced] = useDebouncedValue(value, 300)
    const [results, setResults] = useState<any[]>([])
    useEffect(() => {
        if (debounced.length < 2) {
            setResults([])
            return
        }
        console.log(debounced)
        fetch(createPlaceRequest(debounced)).then(
            res => {
                res.json().then(data => setResults(data.features))
            },
            err => console.log(err)
        )
    }, [debounced])

    const autocompleteData = useMemo(
        () =>
            results.map((item, i) => ({
                address: item.place_name,
                name: item.text,
                value: item.text,
                center: item.center,
                id: item.id,
                key: item.id,
            })),
        [results]
    )

    return (
        <Autocomplete
            // @ts-ignore - igonre override of value
            {...props}
            data={autocompleteData}
            itemComponent={PlaceAutoCompleteItem}
            value={value}
            onChange={e => {
                setValue(e)
                props.onChange?.(e)
            }}
        />
    )
}
