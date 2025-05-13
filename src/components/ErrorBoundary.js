import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <ErrorOutline color="error" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body1" paragraph>
              We're sorry, but there was an error loading this part of the page.
            </Typography>
            {this.state.error && (
              <Box sx={{ mt: 2, mb: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1, textAlign: 'left' }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                  {this.state.error.toString()}
                </Typography>
              </Box>
            )}
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
              <Button
                variant="outlined"
                sx={{ ml: 2 }}
                onClick={() => this.setState({ hasError: false })}
              >
                Try Again
              </Button>
            </Box>
          </Paper>
        </Container>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
