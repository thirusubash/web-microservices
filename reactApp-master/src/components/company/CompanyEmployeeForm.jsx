import React, {useCallback, useEffect,  useState} from 'react';
import {
    Autocomplete,
    Button,
    Container,
    FormControl,FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import companyApi from "@api/companyApi";
import suggestionApi from "@api/SugesstionApi";
import useDebounce from "@assets/useDebounce";
import {Search} from "@mui/icons-material";
function CompanyEmployeeForm({ companyId , employeeData , onSuccess, notification}) {
    const [employee, setEmployee] = useState({
        id: employeeData?.id || null,
        firstName: employeeData?.firstName || '',
        lastName: employeeData?.lastName || '',
        employeeCode: employeeData?.employeeCode || '',
        email: employeeData?.email || '',
        mobileNumber: employeeData?.mobileNumber || '',
        salary: employeeData?.salary || 0,
        status: employeeData?.status || false,
        hireDate: employeeData?.hireDate || null,
        dateOfBirth: employeeData?.dateOfBirth || null,
        gender: employeeData?.gender || 'male',
        nationality: employeeData?.nationality || '',
        maritalStatus: employeeData?.maritalStatus || '',
        address: employeeData?.address || '',
        emergencyContact: employeeData?.emergencyContact || '',
        employmentType: employeeData?.employmentType || '',
        reportingTo: employeeData?.reportingTo || '',
        education: employeeData?.education || '',
        skills: employeeData?.skills || '',
        certifications: employeeData?.certifications || '',
        backgroundCheck: employeeData?.backgroundCheck || '',
        password: employeeData?.password || '',
        roles: employeeData?.roles || [],
        groups: employeeData?.groups || [],
        designation: employeeData?.designation || { id: '', name: '' },
        plant: employeeData?.plant || { id: '', name: '' },
        company: employeeData?.company || { id: '', name: '' },
    });
    const [allPlants, setAllPlants] = useState([]);
    const [allDesignations, setAllDesignations] = useState("");
    const [allReportingTo, setAllReportingTo] = useState("");
    const [allCompanyRoles, setAllCompanyRoles] = useState("");
    const [allCompanyGroups, setAllCompanyGroups] = useState("");
    const [plantSearchQuery, setPlantSearchQuery] = useState('');
    const [designationSearchQuery, setDesignationSearchQuery] = useState('');
    const [reportToSearchQuery, setManagerSearchQuery] = useState('');
    const [saveInProgress, setSaveInProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [roleSearchQuery, setRoleSearchQuery] = useState("");
    const [groupSearchQuery, setGroupSearchQuery] = useState("");
    const [selectedPlant, setSelectedPlant] = useState(employeeData?.plant || null);
    const [selectedReportingTo, setSelectedReportingTo] = useState(employeeData?.reportingTo || null);
    const [selectedDesignation, setSelectedDesignation] = useState(employeeData?.designation || null);
    const [selectedRoles, setSelectedRoles] = useState(employeeData?.roles || []);
    const [selectedGroups, setSelectedGroups] = useState(employeeData?.groups || []);


    const handlePlantChange = (event, newValue) => {
        setSelectedPlant(newValue);
        setEmployee((prevState) => ({
            ...prevState,
            plant: newValue || { id: '', name: '' },
        }));
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleReportingChange = (event, newValue) => {
        if (newValue && newValue.id && newValue.firstName && newValue.lastName) {
            const selectedReportingToString = `${newValue.id}-${newValue.firstName}-${newValue.lastName}`;
            setSelectedReportingTo(selectedReportingToString);
            setEmployee((prevState) => ({
                ...prevState,
                reportingTo: selectedReportingToString.toString(),
            }));
        } else {
            setSelectedReportingTo('');
            setEmployee((prevState) => ({
                ...prevState,
                reportingTo: '',
            }));
        }
    };





    const handleDesignationChange = (event, newValue) => {
        setSelectedDesignation(newValue);
        setEmployee(prevState => ({
            ...prevState,
            designation: newValue ? { id: newValue.id } : null // Check if newValue is defined
        }));
    };


    const handleRoleChange = (event, newValue) => {
        // Update the selectedRoles state
        setSelectedRoles(newValue);
        // Update the roles of the employee in the component's state
        setEmployee((prevState) => ({
            ...prevState,
            roles: newValue,
        }));
    };

    const handleGroupChange = (event, newValue) => {
        // Update the selectedGroups state
        setSelectedGroups(newValue);
        // Update the groups of the employee in the component's state
        setEmployee((prevState) => ({
            ...prevState,
            groups: newValue,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setSaveInProgress(true);
            try {
                await companyApi.addEmployee(companyId, employee);
                notification({
                    open: true,
                    severity: 'success',
                    message: 'Employee Saved successfully!',
                });
                if (onSuccess) {
                    onSuccess();
                }
            } catch (error) {
                console.error('Error adding employee:', error.message);
                notification({
                    open: true,
                    severity: 'error',
                    message: 'Please try again.' + error.message,
                });
            } finally {
                setSaveInProgress(false);
            }
        }
    };

    const debouncedSearchQuery = useDebounce(designationSearchQuery, 500);


    const fetchSuggestion = useCallback(async (endpoint, query) => {
        try {
            return await suggestionApi.Suggestion(companyId, endpoint, query);
        } catch (error) {
            notification({
                open: true,
                message: `Failed to fetch ${endpoint} - ` + error.message,
                severity: "error"
            });
            throw error;
        }
    }, [companyId]);



    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const plants = await fetchSuggestion('plants', plantSearchQuery);
                const designations = await fetchSuggestion('designations', designationSearchQuery);
                const reportTos = await fetchSuggestion('employees', reportToSearchQuery);
                const roles = await fetchSuggestion('roles', roleSearchQuery);
                const groups = await fetchSuggestion('groups', groupSearchQuery);

                setAllPlants(plants);
                setAllDesignations(designations);
                setAllReportingTo(reportTos);
                setAllCompanyRoles(roles);
                setAllCompanyGroups(groups);
            } catch (error) {
                notification({
                    open:true,
                    message: error.message,
                    severity: "error"
                });
            }
        }

        fetchSuggestions();
    }, [plantSearchQuery, designationSearchQuery, reportToSearchQuery, roleSearchQuery, groupSearchQuery, companyId]);


    const validate = () => {
        let tempErrors = {};

        // Validation for First Name
        if (!employee.firstName) {
            tempErrors.firstName = "First name is required.";
        }

        // Validation for Last Name
        if (!employee.lastName) {
            tempErrors.lastName = "Last name is required.";
        }

        // Validation for Email
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(employee.email)) {
            tempErrors.email = "Enter a valid email address.";
        }

        // Validation for Mobile Number
        if (!employee.mobileNumber) {
            tempErrors.mobileNumber = "Mobile number is required.";
        } else if (employee.mobileNumber.length !== 10) {
            tempErrors.mobileNumber = "Mobile number should be 10 digits long.";
        } else if (!/^[0-9]+$/.test(employee.mobileNumber)) {
            tempErrors.mobileNumber = "Mobile number should only contain digits.";
        }
        // validation for date f birth
        if (!employee.dateOfBirth) {
            tempErrors.dateOfBirth = "Date of birth is required.";
        } else {
            const dob = new Date(employee.dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear() - ((today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) ? 1 : 0);

            if (age < 13) {
                tempErrors.dateOfBirth = "Age must be above 13 years.";
            }
        }

        // Validation for Gender (must be selected)
        // Validation for Gender (must be selected)
        if (!employee.gender || !["male", "female", "other"].includes(employee.gender)) {
            tempErrors.gender = "Gender must be selected.";
        }


        // Validation for Nationality (must be filled out/selected)
        if (!employee.nationality.trim()) {
            tempErrors.nationality = "Nationality must be selected/filled out.";
        }

        if (!employee.address.trim()) {
            tempErrors.address = "Address is required.";
        }

        // Validation for Emergency Contact (must be a 10-digit number)
        if (!employee.emergencyContact) {
            tempErrors.emergencyContact = "Emergency Contact is required.";
        } else if (employee.emergencyContact.length !== 10) {
            tempErrors.emergencyContact = "Emergency Contact should be 10 digits long.";
        } else if (!/^[0-9]+$/.test(employee.emergencyContact)) {
            tempErrors.emergencyContact = "Emergency Contact should only contain digits.";
        }

        // Validation for Employment Type (must be filled)
        if (!employee.employmentType) {
            tempErrors.employmentType = "Employment Type is required.";
        }

        // Validation for Education (must be filled)
        if (!employee.education) {
            tempErrors.education = "Education is required.";
        }
        // Validation for Skills (must be filled)
        if (!employee.skills) {
            tempErrors.skills = "Skills are required.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };



    return (
        <Container>


            <form noValidate autoComplete="off">

                <FormControl fullWidth sx={{ marginBottom: 4, marginTop: 2 }}>
                    <Autocomplete
                        options={allPlants}
                        isOptionEqualToValue={(option, value) => option.id === (value ? value.id : '')}
                        getOptionLabel={(plant) => (plant ? `${plant.id} - ${plant.name}` : '')}
                        value={selectedPlant}
                        onChange={handlePlantChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Select Plant"
                                placeholder={employee.plant ? employee.plant.name : 'Search Plants'}
                                onChange={(e) => setPlantSearchQuery(e.target.value)}
                            />
                        )}
                    />
                </FormControl>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            fullWidth
                            label="First Name "
                            name="firstName"
                            value={employee.firstName}
                            onChange={handleChange}
                            {...(errors.firstName && { error: true, helperText: errors.firstName })}
                        />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={employee.lastName}
                            onChange={handleChange}
                            {...(errors.lastName && { error: true, helperText: errors.lastName })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            fullWidth
                            label="Employee Code"
                            name="employeeCode"
                            value={employee.employeeCode}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            fullWidth
                            label="Hire Date"
                            name="hireDate"
                            value={employee.hireDate}
                            onChange={handleChange}
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            options={allDesignations}
                            getOptionLabel={(designation) => designation ? `${designation.id} - ${designation.name}` : ""}
                            value={selectedDesignation}
                            onChange={handleDesignationChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select Designation"
                                    placeholder="Search Designation"
                                    onChange={(e) => setDesignationSearchQuery(e.target.value)}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            fullWidth
                            label="Mobile Number"
                            name="mobileNumber"
                            value={employee.mobileNumber}
                            onChange={handleChange}
                            {...(errors.mobileNumber && { error: true, helperText: errors.mobileNumber })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Salary"
                            name="salary"
                            value={employee.salary}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            fullWidth
                            label="Date of Birth"
                            name="dateOfBirth"
                            value={employee.dateOfBirth}
                            onChange={handleChange}
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...(errors.dateOfBirth && { error: true, helperText: errors.dateOfBirth })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth required error={!!errors.gender}>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                label="Gender"
                                name="gender"
                                value={employee.gender}
                                onChange={handleChange}
                            >
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                                <MenuItem value={"other"}>Other</MenuItem>
                            </Select>
                            {errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
                        </FormControl>
                    </Grid>



                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Nationality"
                            name="nationality"
                            value={employee.nationality}
                            onChange={handleChange}
                            {...(errors.nationality && { error: true, helperText: errors.nationality })}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="marital-status-label">Marital Status</InputLabel>
                            <Select
                                labelId="marital-status-label"
                                label="Marital Status"
                                name="maritalStatus"
                                value={employee.maritalStatus}
                                onChange={handleChange}
                            >
                                <MenuItem value={"single"}>Single</MenuItem>
                                <MenuItem value={"married"}>Married</MenuItem>
                                <MenuItem value={"divorced"}>Divorced</MenuItem>
                                <MenuItem value={"widowed"}>Widowed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={employee.address}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            {...(errors.address && { error: true, helperText: errors.address })}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Emergency Contact"
                            name="emergencyContact"
                            value={employee.emergencyContact}
                            onChange={handleChange}
                            {...(errors.emergencyContact && { error: true, helperText: errors.emergencyContact })}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth error={!!errors.employmentType}>
                            <InputLabel id="employment-type-label">Employment Type</InputLabel>
                            <Select
                                labelId="employment-type-label"
                                label="Employment Type"
                                name="employmentType"
                                value={employee.employmentType}
                                onChange={handleChange}
                            >
                                <MenuItem value={"full-time"}>Full-time</MenuItem>
                                <MenuItem value={"part-time"}>Part-time</MenuItem>
                                <MenuItem value={"contract"}>Contract</MenuItem>
                                <MenuItem value={"temporary"}>Temporary</MenuItem>
                                <MenuItem value={"internship"}>Internship</MenuItem>
                            </Select>
                            {errors.employmentType && <FormHelperText style={{color: 'red', fontSize: '0.75rem', margin: '3px 0 0 14px'}}>{errors.employmentType}</FormHelperText>}
                        </FormControl>
                    </Grid>



                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            fullWidth
                            options={allReportingTo}
                            getOptionLabel={(employee) => employee ? `${employee.id} - ${employee.firstName} ${employee.lastName}` : ''}
                            value={selectedReportingTo?.toString()} // Set the value to the state variable
                            onChange={handleReportingChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Reporting Person"
                                    placeholder="Search "
                                    onChange={(e) => setManagerSearchQuery(e.target.value)}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                {params.InputProps.startAdornment}
                                                <Search /> {/* You can import the SearchIcon from MUI icons */}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                        />

                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Education"
                            name="education"
                            value={employee.education}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            {...(errors.education && { error: true, helperText: errors.education })}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Skills"
                            name="skills"
                            value={employee.skills}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            {...(errors.skills && { error: true, helperText: errors.skills })}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Certifications"
                            name="certifications"
                            value={employee.certifications}
                            onChange={handleChange}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            multiple
                            options={allCompanyRoles}
                            getOptionLabel={(role) => (role ? `${role.id} - ${role.name}` : '')}
                            value={selectedRoles}
                            onChange={handleRoleChange} // Use the handleRoleChange function here
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select Roles"
                                    placeholder="Search Roles"
                                />
                            )}
                        />
                        {errors.roles && (
                            <FormHelperText error>{errors.roles}</FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            multiple
                            options={allCompanyGroups}
                            getOptionLabel={(group) =>
                                group ? `${group.id} - ${group.name}` : ''
                            }
                            value={selectedGroups}
                            onChange={handleGroupChange} // Use the handleGroupChange function here
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select Groups"
                                    placeholder="Search Groups"
                                />
                            )}
                        />
                        {errors.groups && (
                            <FormHelperText error>{errors.groups}</FormHelperText>
                        )}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Background Check"
                            name="backgroundCheck"
                            value={employee.backgroundCheck}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            {...(errors.email && { error: true, helperText: errors.email })}
                        />
                    </Grid>
                    {/*... Continue with all other fields as necessary ...*/}
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={saveInProgress}>
                            {saveInProgress ? 'Saving...' : 'Save'}
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </Container>
    );
}

export default CompanyEmployeeForm;
