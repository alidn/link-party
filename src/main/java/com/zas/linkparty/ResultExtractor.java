package com.zas.linkparty;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@FunctionalInterface
public interface ResultExtractor<T> {
    Optional<T> extractResult(ResultSet resultSet) throws SQLException;
}
