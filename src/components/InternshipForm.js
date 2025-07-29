import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './InternshipForm.css';

export default function InternshipForm() {
    const [formData, setFormData] = useState({
        // Personal Details
        fullName: '',
        dob: '',
        gender: '',
        nationality: '',
        contactNumber: '',
        alternateContactNumber: '',
        email: '',
        aadharNo: '',
        // Academic Details
        college: '',
        courseBranch: '',
        yearOfStudy: '1st',
        collegeID: '',
        collegeEmail: '',
        // Internship Details
        position: '',
        department: '',
        startDate: '',
        endDate: '',
        stipend: '',
        mode: '',
        // Address Details
        currentAddress: '',
        currentCity: '',
        currentState: '',
        currentPincode: '',
        sameAsPermanent: false,
        permanentAddress: '',
        permanentCity: '',
        permanentState: '',
        permanentPincode: '',
        // Emergency Contact
        emergencyName: '',
        emergencyRelationship: '',
        emergencyContactNumber: '',
        emergencyAddress: '',
        // Bank Details
        accountHolderName: '',
        bankName: '',
        branchName: '',
        accountNumber: '',
        ifscCode: '',
        // Documents
        collegeIDDoc: false,
        resume: false,
        aadharCard: false,
        passportPhoto: false,
        approvalLetter: false,
        bankPassbook: false,
        signedNDA: false,
        // Declaration
        declarationAgreed: false,
        internSignature: '',
        signatureDate: '',
        // Office Use
        internID: '',
        assignedProject: '',
        verifiedBy: '',
        designation: '',
        officeSignature: '',
        verificationDate: '',
        remarks: ''
    });

    const [submittedData, setSubmittedData] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = [
            { id: 'fullName', name: 'Full Name' },
            { id: 'dob', name: 'Date of Birth' },
            { id: 'gender', name: 'Gender' },
            { id: 'nationality', name: 'Nationality' },
            { id: 'contactNumber', name: 'Contact Number' },
            { id: 'email', name: 'Email' },
            { id: 'aadharNo', name: 'Aadhar No' },
            { id: 'college', name: 'College' },
            { id: 'courseBranch', name: 'Course & Branch' },
            { id: 'yearOfStudy', name: 'Year of Study' },
            { id: 'collegeID', name: 'College ID' },
            { id: 'collegeEmail', name: 'College Email' },
            { id: 'position', name: 'Position' },
            { id: 'department', name: 'Department' },
            { id: 'startDate', name: 'Start Date' },
            { id: 'endDate', name: 'End Date' },
            { id: 'stipend', name: 'Stipend' },
            { id: 'mode', name: 'Mode' },
            { id: 'currentAddress', name: 'Current Address' },
            { id: 'currentCity', name: 'Current City' },
            { id: 'currentState', name: 'Current State' },
            { id: 'currentPincode', name: 'Current Pincode' },
            ...(formData.sameAsPermanent ? [] : [
                { id: 'permanentAddress', name: 'Permanent Address' },
                { id: 'permanentCity', name: 'Permanent City' },
                { id: 'permanentState', name: 'Permanent State' },
                { id: 'permanentPincode', name: 'Permanent Pincode' }
            ]),
            { id: 'emergencyName', name: 'Emergency Name' },
            { id: 'emergencyRelationship', name: 'Emergency Relationship' },
            { id: 'emergencyContactNumber', name: 'Emergency Contact Number' },
            { id: 'emergencyAddress', name: 'Emergency Address' }
        ];

        let isValid = true;
        requiredFields.forEach(field => {
            const inputElement = document.querySelector(`[name="${field.id}"]`);
            if (!formData[field.id]) {
                if (inputElement) inputElement.style.borderColor = 'red';
                isValid = false;
            } else {
                if (inputElement) inputElement.style.borderColor = '#ddd';
            }
        });

        if (!isValid) {
            alert('Please fill all required fields');
            return;
        }

        setSubmittedData(prev => ([...prev, formData]));
        setShowSuccess(true);

        // Reset form
        setFormData({
            fullName: '',
            dob: '',
            gender: '',
            nationality: '',
            contactNumber: '',
            alternateContactNumber: '',
            email: '',
            aadharNo: '',
            college: '',
            courseBranch: '',
            yearOfStudy: '1st',
            collegeID: '',
            collegeEmail: '',
            position: '',
            department: '',
            startDate: '',
            endDate: '',
            stipend: '',
            mode: '',
            currentAddress: '',
            currentCity: '',
            currentState: '',
            currentPincode: '',
            sameAsPermanent: false,
            permanentAddress: '',
            permanentCity: '',
            permanentState: '',
            permanentPincode: '',
            emergencyName: '',
            emergencyRelationship: '',
            emergencyContactNumber: '',
            emergencyAddress: '',
            accountHolderName: '',
            bankName: '',
            branchName: '',
            accountNumber: '',
            ifscCode: '',
            collegeIDDoc: false,
            resume: false,
            aadharCard: false,
            passportPhoto: false,
            approvalLetter: false,
            bankPassbook: false,
            signedNDA: false,
            declarationAgreed: false,
            internSignature: '',
            signatureDate: '',
            internID: '',
            assignedProject: '',
            verifiedBy: '',
            designation: '',
            officeSignature: '',
            verificationDate: '',
            remarks: ''
        });

        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleExportToExcel = () => {
        if (submittedData.length === 0) {
            alert('No data to export!');
            return;
        }

        const excelData = submittedData.map(data => ({
            'Full Name': data.fullName,
            'Email': data.email,
            'Contact': data.contactNumber,
            'Aadhar': data.aadharNo,
            'College': data.college,
            'Course': data.courseBranch,
            'College Email': data.collegeEmail,
            'Year': data.yearOfStudy,
            'Position': data.position,
            'Department': data.department,
            'Start Date': data.startDate,
            'End Date': data.endDate,
            'Stipend (₹)': data.stipend,
            'Internship Mode': data.mode,
            // Add more fields if needed
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Interns");
        XLSX.writeFile(workbook, "Internship_Data.xlsx");
    };

    return (
        <div className="app-container">
            <h1>Dev Creations – Internship Joining Form</h1>

            {showSuccess && (
                <div style={{ background: '#d4edda', color: '#155724', padding: '10px', marginBottom: '20px', borderRadius: '4px' }}>
                    Success! Form submitted. Total applications: {submittedData.length}
                </div>
            )}

            <form onSubmit={handleSubmit} autoComplete="off">
                {/* Personal Details */}
                <div className="form-section">
                    <h2>1. Personal Details</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Full Name</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="required">Date of Birth</label>
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Gender</label>
                            <div className="radio-group">
                                {['Male', 'Female', 'Other'].map(gender => (
                                    <div className="radio-option" key={gender}>
                                        <input
                                            type="radio"
                                            id={`gender-${gender}`}
                                            name="gender"
                                            value={gender}
                                            checked={formData.gender === gender}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor={`gender-${gender}`}>{gender}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Nationality</label>
                            <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="required">Contact Number</label>
                            <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Alternate Contact Number</label>
                            <input type="tel" name="alternateContactNumber" value={formData.alternateContactNumber} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label className="required">Email ID</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Aadhar No</label>
                            <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                {/* Academic Details */}
                <div className="form-section">
                    <h2>2. Academic Details</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">College/University</label>
                            <input type="text" name="college" value={formData.college} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="required">Course & Branch</label>
                            <input type="text" name="courseBranch" value={formData.courseBranch} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Year of Study</label>
                            <div className="radio-group">
                                {['1st', '2nd', '3rd', 'Final'].map(year => (
                                    <div className="radio-option" key={year}>
                                        <input
                                            type="radio"
                                            id={`year-${year}`}
                                            name="yearOfStudy"
                                            value={year}
                                            checked={formData.yearOfStudy === year}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor={`year-${year}`}>{year} Year</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">College ID</label>
                            <input type="text" name="collegeID" value={formData.collegeID} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="required">College Email ID</label>
                            <input type="email" name="collegeEmail" value={formData.collegeEmail} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                {/* Internship Details */}
                <div className="form-section">
                    <h2>3. Internship Details</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Position</label>
                            <input type="text" name="position" value={formData.position} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="required">Department/Project</label>
                            <input type="text" name="department" value={formData.department} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Internship Start Date</label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="required">Internship End Date</label>
                            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Stipend (₹)</label>
                            <input type="text" name="stipend" value={formData.stipend} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="required">Internship Mode</label>
                            <div className="radio-group">
                                {['Offline', 'Online', 'Hybrid'].map(mode => (
                                    <div className="radio-option" key={mode}>
                                        <input
                                            type="radio"
                                            id={`mode-${mode}`}
                                            name="mode"
                                            value={mode}
                                            checked={formData.mode === mode}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor={`mode-${mode}`}>{mode}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Details */}
                <div className="form-section">
                    <h2>4. Address Details</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Current Address</label>
                            <input type="text" name="currentAddress" value={formData.currentAddress} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="required">City</label>
                            <input type="text" name="currentCity" value={formData.currentCity} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">State</label>
                            <input type="text" name="currentState" value={formData.currentState} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="required">Pincode</label>
                            <input type="text" name="currentPincode" value={formData.currentPincode} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group checkbox-option">
                            <input
                                type="checkbox"
                                id="sameAsPermanent"
                                name="sameAsPermanent"
                                checked={formData.sameAsPermanent}
                                onChange={(e) => {
                                    handleChange(e);
                                    if (e.target.checked) {
                                        setFormData(prev => ({
                                            ...prev,
                                            permanentAddress: prev.currentAddress,
                                            permanentCity: prev.currentCity,
                                            permanentState: prev.currentState,
                                            permanentPincode: prev.currentPincode
                                        }));
                                    }
                                }}
                            />
                            <label htmlFor="sameAsPermanent">Same as Permanent Address</label>
                        </div>
                    </div>
                    {!formData.sameAsPermanent && (
                        <>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="required">Permanent Address</label>
                                    <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label className="required">City</label>
                                    <input type="text" name="permanentCity" value={formData.permanentCity} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="required">State</label>
                                    <input type="text" name="permanentState" value={formData.permanentState} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label className="required">Pincode</label>
                                    <input type="text" name="permanentPincode" value={formData.permanentPincode} onChange={handleChange} required />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Emergency Contact */}
                <div className="form-section">
                    <h2>5. Emergency Contact</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Name</label>
                            <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="required">Relationship</label>
                            <input type="text" name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Contact Number</label>
                            <input type="tel" name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="required">Address</label>
                            <input type="text" name="emergencyAddress" value={formData.emergencyAddress} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                {/* Bank Details */}
                <div className="form-section">
                    <h2>6. Bank Details (if stipend applicable)</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Account Holder Name</label>
                            <input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Bank Name</label>
                            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Branch Name</label>
                            <input type="text" name="branchName" value={formData.branchName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Account Number</label>
                            <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>IFSC Code</label>
                            <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* Documents */}
                <div className="form-section">
                    <h2>7. Submitted Documents</h2>
                    <div className="form-row">
                        {[
                            { label: 'College ID Proof', name: 'collegeIDDoc' },
                            { label: 'Resume', name: 'resume' },
                            { label: 'Aadhar Card', name: 'aadharCard' },
                            { label: 'Passport Photo', name: 'passportPhoto' },
                            { label: 'Approval Letter', name: 'approvalLetter' },
                            { label: 'Bank Passbook', name: 'bankPassbook' },
                            { label: 'Signed NDA', name: 'signedNDA' }
                        ].map(doc => (
                            <div className="form-group checkbox-option" key={doc.name}>
                                <input
                                    type="checkbox"
                                    id={doc.name}
                                    name={doc.name}
                                    checked={formData[doc.name]}
                                    onChange={handleChange}
                                />
                                <label htmlFor={doc.name}>{doc.label}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Declaration */}
                <div className="form-section">
                    <h2>8. Declaration</h2>
                    <div className="form-row">
                        <div className="form-group checkbox-option">
                            <input
                                type="checkbox"
                                id="declarationAgreed"
                                name="declarationAgreed"
                                checked={formData.declarationAgreed}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="declarationAgreed">
                                I hereby declare that the information is true and correct to the best of my knowledge.
                            </label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Intern Signature</label>
                            <input type="text" name="internSignature" value={formData.internSignature} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" name="signatureDate" value={formData.signatureDate} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* Office Use */}
                <div className="form-section">
                    <h2>9. Office Use</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Intern ID</label>
                            <input type="text" name="internID" value={formData.internID} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Assigned Project</label>
                            <input type="text" name="assignedProject" value={formData.assignedProject} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Verified By</label>
                            <input type="text" name="verifiedBy" value={formData.verifiedBy} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Office Signature</label>
                            <input type="text" name="officeSignature" value={formData.officeSignature} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" name="verificationDate" value={formData.verificationDate} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Remarks</label>
                            <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div style={{ margin: '25px 0', textAlign: 'center' }}>
                    <button type="submit" className="btn" style={{ marginRight: 15 }}>Submit</button>

                    {/* Export button shows only if we have submitted data */}
                    {submittedData.length > 0 && (
                        <button type="button" className="btn" onClick={handleExportToExcel}>
                            Export to Excel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
