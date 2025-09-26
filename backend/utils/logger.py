import logging, os

class SingletonLogger:
    """singleton logger to ensure only one logger instance throughout the project"""
    
    _instance = None
    _logger = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(SingletonLogger, cls).__new__(cls)
            cls._instance._setup_logger()
        return cls._instance # return the singleton logger instance
    
    def _setup_logger(self):
        if self._logger is not None:
            return
        
        # determine log level (less verbose in production) based on environment
        if os.getenv('FLASK_ENV') == 'production':
            level = logging.INFO 
        else:
            level = logging.DEBUG 
        
        # set class variable (shared by all instances)
        self._logger = logging.getLogger('rivas_pro_painting')
        if self._logger.handlers:
            return
        
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        
        # add handler to logger (determine where logs are printed)
        handler = logging.StreamHandler() # print to console
        handler.setFormatter(formatter)
        self._logger.addHandler(handler)
        self._logger.setLevel(level)
        
        # root logger to avoid duplicate messages
        self._logger.propagate = False
    
    def get_logger(self):
        return self._logger
    
    def debug(self, message: str, *args, **kwargs):
        self._logger.debug(message, *args, **kwargs)
    
    def info(self, message: str, *args, **kwargs):
        self._logger.info(message, *args, **kwargs)
    
    def warning(self, message: str, *args, **kwargs):
        self._logger.warning(message, *args, **kwargs)
    
    def error(self, message: str, *args, **kwargs):
        self._logger.error(message, *args, **kwargs)
    
    def critical(self, message: str, *args, **kwargs):
        self._logger.critical(message, *args, **kwargs)

# create the singleton logger instance
logger = SingletonLogger()