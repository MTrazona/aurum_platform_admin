# Transaction Routes

This directory contains the transaction-related pages and routing.

## Files

- `index.tsx` - Main transactions list page (`/transactions`)
- `[id].tsx` - Transaction details page (`/transactions/:id`)

## Routing Structure

- **List View**: `/transactions` - Shows all transactions with statistics
- **Detail View**: `/transactions/:id` - Shows detailed information for a specific transaction

## Navigation

- From transactions list: Click "View" button on any transaction row
- From transaction details: Click "Back" button to return to list
- Direct URL access: Navigate directly to `/transactions/{transactionId}`

## URL Parameters

The `:id` parameter can be either:
- `txnID` - Transaction ID
- `transactionCode` - Transaction code

## Features

- **Responsive Design**: Adapts to different screen sizes
- **Loading States**: Shows spinner while fetching data
- **Error Handling**: Redirects to list if transaction not found
- **Breadcrumb Navigation**: Maintains navigation context
- **Role-based Access**: Protected by authentication and authorization
