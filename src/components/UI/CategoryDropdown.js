import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const categories = [
    { id: 1, value: 'General' },
    { id: 2, value: 'OBC' },
    { id: 3, value: 'SEBC' },
    { id: 4, value: 'Other' },
    { id: 5, value: 'ST' },
    { id: 6, value: 'SC' }]

const CategoryDropdown = (props) => {
    const [open, setOpen] = React.useState(false)

    const handleChange = (event) => {
        props.categoryData(event.target.value)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 380 }}>
                <InputLabel id='demo-controlled-open-select-label'>{props.title}</InputLabel>
                <Select
                    labelId='demo-controlled-open-select-label'
                    id='demo-controlled-open-select'
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    label={props.title}
                    onChange={handleChange}
                    defaultValue='0'
                >
                    <MenuItem value='0'>
                        <em>Select Category</em>
                    </MenuItem>
                    {
                        categories && categories.map(category => {
                            return <MenuItem key={category.id} value={category.value}>{category.value}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </>
    )
}

export default CategoryDropdown