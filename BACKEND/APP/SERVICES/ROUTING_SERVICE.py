from APP.SERVICES.ROUTER_SERVICE import predict_department

def route_department(category: str, text: str = "") -> str:
    """
    Wrapper for router service to predict department.
    """
    return predict_department(category, text)
