from datetime import datetime


def update_decision_date(adoption, new_status):
    if adoption.status != new_status and new_status in ("approved", "rejected"):
        adoption.decision_date = datetime.now()
    if new_status == "pending":
        adoption.decision_date = None
