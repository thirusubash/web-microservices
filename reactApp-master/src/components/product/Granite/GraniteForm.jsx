import React, { useCallback, useEffect, useState } from 'react';
import {TextField, Button, Grid, Autocomplete, MenuItem, FormControl} from "@mui/material";
import Loading from "@components/layout/Loading";
import SuggestionAPI from "@api/SugesstionApi";
import useDebounce from "@assets/useDebounce";
import allProductApi from "@api/allProductApi";

const GraniteForm = ({ companyId, initialGranite, onSuccess, notification }) => {
    const [granite, setMarble] = useState(initialGranite || {});
    const [plants, setPlants] = useState([]);
    const [isLoadingPlants, setIsLoadingPlants] = useState(false);
    const [searchQuery, setSearchQuery] = useState(null);
    const [selectedPlant, setSelectedPlant] = useState(initialGranite?.plant || null);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [savingStatus,setSavingStatus]=useState(false);
    const handleInputChange = e => {
        const { name, value } = e.target;
        setMarble(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async e => {
        e.preventDefault();
        console.log(granite);
        setSavingStatus(true);
        try {
            if (initialGranite) {
                await allProductApi.update("granites",initialGranite.id, granite);
                notification({ message: 'Marble updated successfully!', severity: 'success' });

            } else {
                await allProductApi.create("granites",granite);
                notification({ message: 'Marble added successfully!', severity: 'success' });
            }
            if (onSuccess) onSuccess();
        } catch (error) {
            notification({ message: `Error processing granite: ${error.message}`, severity: 'error' });
        }finally {
            setSavingStatus(false);
        }
    };

    const fetchPlantSuggestions = useCallback(async () => {
        setIsLoadingPlants(true);
        try {
            const response = await SuggestionAPI.Suggestion(companyId, "plants", searchQuery);
            setPlants(response);
            console.log("fetched plants",plants);
        } catch (error) {
            notification({ message: `Error fetching plant suggestions: ${error.message}`, severity: 'error' });
        } finally {
            setIsLoadingPlants(false);
        }
    }, [companyId, notification, searchQuery]);

    useEffect(() => {

            fetchPlantSuggestions();
             setMarble(prev => ({ ...prev, company:{id:companyId} }));
    }, [debouncedSearchQuery]);

    const handlePlantChange = (event, newValue) => {
        setSelectedPlant(newValue);
        setMarble((prevState) => ({
            ...prevState,
            plant: newValue
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            {isLoadingPlants && <Loading />}
            <FormControl fullWidth sx={{ marginBottom: 4, marginTop: 2 }}>
                <Autocomplete
                    options={plants}
                    isOptionEqualToValue={(option, value) => option.id === (value ? value.id : '')}
                    getOptionLabel={(plant) => (plant ? `${plant.id} - ${plant.name}` : '')}
                    value={selectedPlant}
                    onChange={handlePlantChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Select Plant"
                            placeholder={selectedPlant ? selectedPlant.name : 'Search Plants'}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    )}
                />
            </FormControl>


            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={granite.name || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        name="price"
                        type="number"
                        value={granite.price || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        name="description"
                        value={granite.description || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="SKU"
                        variant="outlined"
                        name="sku"
                        value={granite.sku || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Brand"
                        variant="outlined"
                        name="brand"
                        value={granite.brand || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Category"
                        variant="outlined"
                        name="category"
                        value={granite.category || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Weight"
                        variant="outlined"
                        name="weight"
                        type="number"
                        value={granite.weight || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Dimensions"
                        variant="outlined"
                        name="dimensions"
                        value={granite.dimensions || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Color"
                        variant="outlined"
                        name="color"
                        value={granite.color || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Type"
                        variant="outlined"
                        name="type"
                        value={granite.type || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Finish"
                        variant="outlined"
                        name="finish"
                        value={granite.finish || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Origin"
                        variant="outlined"
                        name="origin"
                        value={granite.origin || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                {/* ... Add more fields similarly */}
                <Grid item xs={12}>
                    <TextField
                        select
                        label="Durability"
                        variant="outlined"
                        name="durability"
                        value={granite.durability || ''}
                        onChange={handleInputChange}
                        fullWidth
                    >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </TextField>
                </Grid>
                {/* ... Add more fields similarly */}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit" disabled={savingStatus}>
                        {savingStatus ? "saving...." :"Save"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default GraniteForm;
