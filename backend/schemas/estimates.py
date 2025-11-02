from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import List, Optional
from datetime import datetime


class CustomerSnapshotCreate(BaseModel):
    """Input model for creating/updating customer snapshot"""
    name: str = Field(..., min_length=1, max_length=80)
    email: EmailStr
    phone_number: str = Field(..., min_length=1, max_length=15)
    address: str = Field(..., min_length=1, max_length=120)
    city: str = Field(..., min_length=1, max_length=120)
    state: str = Field(..., min_length=1, max_length=120)
    zip_code: str = Field(..., min_length=1, max_length=120)
    country: str = Field(..., min_length=1, max_length=120)


class EstimateItemCreate(BaseModel):
    """Input model for estimate items"""
    area: str = Field(..., min_length=1, max_length=100)
    work_details: List[str]
    notes_extras: Optional[List[str]] = Field(default_factory=list)

    @field_validator('work_details', mode='after')
    @classmethod
    def filter_empty_work_details(cls, v: List[str]) -> List[str]:
        """Filter out empty strings from work_details"""
        return [detail for detail in v if detail.strip()]

    @field_validator('notes_extras', mode='after')
    @classmethod
    def filter_empty_notes(cls, v: Optional[List[str]]) -> List[str]:
        """Filter out empty strings from notes_extras"""
        if v is None:
            return []
        return [note for note in v if note.strip()]


class EstimateDescriptionCreate(BaseModel):
    """Input model for estimate description"""
    title: str = Field(..., min_length=1, max_length=120)
    work_types: List[str] = Field(..., min_length=1)  # ['exterior', 'interior']
    items: List[EstimateItemCreate] = Field(..., min_length=1)

    @field_validator('work_types')
    @classmethod
    def validate_work_types(cls, v: List[str]) -> List[str]:
        """Validate work types are valid"""
        valid_types = {'exterior', 'interior'}
        for work_type in v:
            if work_type not in valid_types:
                raise ValueError(f"Invalid work type: {work_type}. Must be 'exterior' or 'interior'")
        return v


class EstimateCreate(BaseModel):
    """Input model for creating a new estimate"""
    name: str = Field(..., min_length=1, max_length=80)
    total: float = Field(..., ge=0, description="Total must be positive")
    status: str = Field(..., pattern="^(draft|pending|accepted|declined|completed|in_progress)$")
    notes: Optional[List[str]] = Field(default_factory=list)
    customer_id: Optional[int] = None
    customer_snapshot: CustomerSnapshotCreate
    description: EstimateDescriptionCreate

    @field_validator('notes', mode='after')
    @classmethod
    def filter_empty_notes(cls, v: Optional[List[str]]) -> List[str]:
        """Filter out empty strings from notes"""
        if v is None:
            return []
        return [note for note in v if note.strip()]

    @field_validator('customer_id')
    @classmethod
    def validate_customer_or_snapshot(cls, v: Optional[int], info) -> Optional[int]:
        """Ensure either customer_id or customer_snapshot is provided"""
        if v is None and 'customer_snapshot' not in info.data:
            raise ValueError("Either customer_id or customer_snapshot must be provided")
        return v


class EstimateUpdate(BaseModel):
    """Input model for updating an estimate (all fields optional)"""
    name: Optional[str] = Field(None, min_length=1, max_length=80)
    total: Optional[float] = Field(None, ge=0)
    status: Optional[str] = Field(None, pattern="^(draft|pending|accepted|declined|completed|in_progress)$")
    notes: Optional[List[str]] = None
    customer_snapshot: Optional[CustomerSnapshotCreate] = None
    description: Optional[EstimateDescriptionCreate] = None

    @field_validator('notes', mode='after')
    @classmethod
    def filter_empty_notes(cls, v: Optional[List[str]]) -> Optional[List[str]]:
        """Filter out empty strings from notes"""
        if v is None:
            return None
        filtered = [note for note in v if note.strip()]
        return filtered if filtered else None


class CustomerSnapshotResponse(BaseModel):
    """Output model for customer snapshot"""
    name: str
    email: str
    phone_number: str
    address: str
    city: str
    state: str
    zip_code: str
    country: str

    class Config:
        from_attributes = True


class EstimateItemResponse(BaseModel):
    """Output model for estimate items"""
    id: int
    area: str
    work_details: List[str]
    notes_extras: List[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class EstimateDescriptionResponse(BaseModel):
    """Output model for estimate description"""
    id: int
    title: str
    work_types: List[str]
    items: List[EstimateItemResponse]

    class Config:
        from_attributes = True


class EstimateResponse(BaseModel):
    """Output model for a single estimate"""
    id: int
    name: str
    total: float
    notes: List[str]
    customer_id: int
    customer_snapshot: CustomerSnapshotResponse
    status: str
    created_at: datetime
    updated_at: datetime
    description: EstimateDescriptionResponse

    class Config:
        from_attributes = True


class EstimateListResponse(BaseModel):
    """Output model for list of estimates"""
    estimates: List[EstimateResponse]


class EstimateSingleResponse(BaseModel):
    """Output model for single estimate with message"""
    estimate: EstimateResponse
    message: Optional[str] = None

class ErrorResponse(BaseModel):
    """Standardized error response"""
    error: str
    details: Optional[dict] = None