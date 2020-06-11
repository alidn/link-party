package com.zas.linkparty;

import org.springframework.dao.CleanupFailureDataAccessException;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.datasource.init.ScriptStatementFailedException;
import org.springframework.jdbc.datasource.lookup.DataSourceLookupFailureException;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

public class QueryExecutor<T> {
    private final DataSource dataSource;
    private final String query;
    private ParameterSetter parameterSetter;
    private ResultExtractor<T> resultExtractor;

    public QueryExecutor(DataSource dataSource, String query, ParameterSetter parameterSetter, ResultExtractor<T> resultExtractor) {
        assertNotNull(dataSource, "Data source should not be null");
        assertNotNull(query, "Query should not be null");

        this.dataSource = dataSource;
        this.query = query;
        this.parameterSetter = parameterSetter;
        this.resultExtractor = resultExtractor;
    }

    public QueryExecutor(DataSource dataSource, String query, ParameterSetter parameterSetter) {
        assertNotNull(dataSource, "Data source should not be null");
        assertNotNull(query, "Query should not be null");

        this.dataSource = dataSource;
        this.query = query;
        this.parameterSetter = parameterSetter;
    }

    public QueryExecutor(DataSource dataSource, String query) {
        assertNotNull(dataSource, "Data source should not be null");
        assertNotNull(query, "Query should not be null");

        this.dataSource = dataSource;
        this.query = query;
    }

    public Optional<T> executeAndGetResult() throws DataAccessException {
        try {
            Connection connection;
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement;
            preparedStatement = connection.prepareStatement(query);
            if (parameterSetter != null) {
                parameterSetter.setParameters(preparedStatement);

            }
            ResultSet resultSet;
            resultSet = preparedStatement.executeQuery();

            if (resultExtractor == null) {
                throw new IllegalStateException("Result extractor is not set");
            }
            Optional<T> result = null;
            result = resultExtractor.extractResult(resultSet);


            try {
                connection.close();
            } catch (SQLException sqlException) {
                throw new CleanupFailureDataAccessException(sqlException.getMessage(), sqlException);
            }
            return result;
        } catch (SQLException sqlException) {
            throw new DataSourceLookupFailureException(sqlException.getMessage());
        }
    }

    public int executeUpdate() throws DataAccessException {
        try {
            Connection connection = null;
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = null;
            preparedStatement = connection.prepareStatement(query);
            if (parameterSetter != null) {
                parameterSetter.setParameters(preparedStatement);

            }
            int rowsUpdated = 0;
            rowsUpdated = preparedStatement.executeUpdate();

            try {
                connection.close();
            } catch (SQLException sqlException) {
                throw new CleanupFailureDataAccessException(sqlException.getMessage(), sqlException);
            }
            return rowsUpdated;
        } catch (SQLException sqlException) {
            throw new DataSourceLookupFailureException(sqlException.getMessage());
        }
    }

    private void assertNotNull(Object object, String message) throws NullPointerException {
        if (object == null) {
            throw new NullPointerException(message);
        }
    }
}
