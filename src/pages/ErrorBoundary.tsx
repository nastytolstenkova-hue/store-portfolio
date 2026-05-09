import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unexpected application error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/main";
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-gray-400">
            Application error
          </p>

          <h1 className="mb-4 text-3xl font-semibold md:text-5xl">
            Something went wrong
          </h1>

          <p className="mb-6 max-w-md text-gray-500">
            An unexpected error occurred. Please refresh the page or go back to
            the home page.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={this.handleReload}
              className="rounded-xl bg-black px-5 py-2 text-white transition hover:bg-gray-800"
            >
              Refresh page
            </button>

            <button
              type="button"
              onClick={this.handleGoHome}
              className="rounded-xl border border-gray-300 px-5 py-2 transition hover:bg-gray-100"
            >
              Back to home
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
